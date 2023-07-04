import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/Product';

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api'
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
            transformResponse: (response : string) => JSON.parse(response).products,
            providesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
              url: `/products/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
          }),
        addNewProduct: builder.mutation<{}, FormData>({
            query: (payload) => ({
              url: '/products',
              method: 'POST',
              body: payload,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<{}, FormData>({
            query: (payload) => ({
              url: '/products',
              method: 'PUT',
              body: payload,
            }),
            invalidatesTags: ['Product'],
        }),
    })
})

export const { useGetProductsQuery,  useDeleteProductMutation, useAddNewProductMutation, useUpdateProductMutation} = productsAPI;