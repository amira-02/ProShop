import { SHOP_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ShopApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    getShop: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: SHOP_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Shop'],
    }),
    getShopDetails: builder.query({
      query: (ShopId) => ({
        url: `${SHOP_URL}/${ShopId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    
    createShop: builder.mutation({
      query: () => ({
        url: `${SHOP_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Shop'],
    }),
    updateShop: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/${data}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Shop'],
    }),
    uploadShopImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteShop: builder.mutation({
      query: (ShopId) => ({
        url: `${SHOP_URL}/${ShopId}`,
        method: 'DELETE',
      }),
      providesTags: ['Shop'],
    }),
    getTopShop: builder.query({
      query: () => `${SHOP_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});


export const {
  useGetShopQuery,
  useGetShopDetailsQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useUploadShopImageMutation,
  useDeleteShopMutation,
  useGetTopShopQuery,
} = ShopApiSlice;
