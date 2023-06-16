import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/Product";
import { productsAPI } from "../services/ProductsService";

export interface State{
    products: Product[] | null;
    currentProduct : Product | null;
}

const initialState: State = {
    products: null,
    currentProduct: null  
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentProduct(state, action : PayloadAction<number>){
            state.currentProduct = state.products?.find(item => item.id === action.payload) || null;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            productsAPI.endpoints.getProducts.matchFulfilled,
            (state, {payload}) => {
                state.products = payload
            }
        )
    }
})

export const {setCurrentProduct} = productsSlice.actions;

export default productsSlice.reducer;