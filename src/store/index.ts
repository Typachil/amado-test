import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerProducts from "./reducers/reducerProducts";
import { productsAPI } from "./services/ProductsService";

const rootReducer = combineReducers({
    reducerProducts,
    [productsAPI.reducerPath] : productsAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];