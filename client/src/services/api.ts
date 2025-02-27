// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import type { LoginRequest, LoginResponse } from "../types/auth";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL,
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: "/api/token",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation } = api;

import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { LoginRequest, LoginResponse } from "../types/auth";
import type { Product, ProductFilters } from "../types/product";
import toast from "react-hot-toast";

// interface ApiResponse<T> {
//   ok: boolean;
//   message?: string;
//   data?: T;
// }

interface ProductsResponse {
  ok: boolean;
  products: Product[];
  message?: string;
}

interface ProductResponse {
  ok: boolean;
  product: Product;
  message?: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Añadir el token de autenticación si existe
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"], // Para invalidación de caché
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/api/token",
        method: "POST",
        body: credentials,
      }),
      // Manejar errores específicos de login
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return {
          status: response.status,
          message: "Error de autenticación",
        };
      },
    }),

    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/products/listproducts",
        method: "GET",
      }),
      transformResponse: (response: ProductsResponse) => response.products,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return {
          status: response.status,
          message: "Error al obtener productos",
        };
      },
      providesTags: ["Product"],
    }),

    filterProducts: builder.query<Product[], ProductFilters>({
      query: (filters) => ({
        url: "/products/filter",
        method: "GET",
        params: filters, // Aquí pasamos los filtros como parámetros
      }),
      transformResponse: (response: ProductsResponse) => {
        if (response.ok) {
          toast.success("Productos filtrados con éxito.");
          return response.products;
        } else {
          return [];
        }
      },
      transformErrorResponse: () => {
        return [];
      },
      providesTags: ["Product"],
    }),

    getProductByCode: builder.query<Product, string>({
      query: (code) => ({
        url: `/products/oneproduct/${code}`,
        method: "GET",
      }),
      transformResponse: (response: ProductResponse) => response.product,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return {
          status: response.status,
          message: "Error al obtener el producto",
        };
      },
      //providesTags: (result, error, code) => [{ type: "Product", id: code }],
    }),

    getProductsByFilters: builder.query<Product[], ProductFilters>({
      query: (filters) => ({
        url: "/products/productsbyname",
        method: "GET",
        params: filters,
      }),
      transformResponse: (response: ProductsResponse) => response.products,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return {
          status: response.status,
          message: "Error al filtrar productos",
        };
      },
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "/products/createProduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      Product,
      { code: string; product: Partial<Product> }
    >({
      query: ({ code, product }) => ({
        url: `/products/updateProduct`,
        method: "PATCH",
        body: { code, ...product },
      }),
      // invalidatesTags: (result, error, { code }) => [
      //   { type: "Product", id: code },
      //   "Product",
      // ],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (code) => ({
        url: `/products/deleteProduct/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useFilterProductsQuery,
  useGetProductByCodeQuery,
  useGetProductsByFiltersQuery,
  useLoginMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
