import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/Product";
import { productsAPI } from "../services/ProductsService";

export interface State{
    products: Product[] | null;
    currentProduct: Product | null;
    isLoading: boolean;
}

const initialState: State = {
    products: null,
    currentProduct: null,
    isLoading: false  
}

function isPendingAction(action: AnyAction) {
    return action.type.endsWith('pending')
}

function isMatchingAction(action: AnyAction) {
    return action.type.endsWith('match')
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentProduct(state, action : PayloadAction<number>){
            state.currentProduct = state.products?.find(item => item.id === action.payload) || null;
        },
        setLoading(state, action : PayloadAction<boolean>){
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            productsAPI.endpoints.getProducts.matchFulfilled,
            (state, {payload}) => {
                state.isLoading = false
                state.products = payload
            }
        )
        builder.addMatcher(
            isPendingAction,
            (state) => {
                state.isLoading = true
            }
        )
        builder.addMatcher(
            isMatchingAction,
            (state) => {
                state.isLoading = false
            }
        )
    }
})

export const {setCurrentProduct, setLoading} = productsSlice.actions;

export default productsSlice.reducer;