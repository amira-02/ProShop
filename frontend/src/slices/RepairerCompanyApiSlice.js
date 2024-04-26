import { REPAIRER_COMPANY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const RepairerCompanyApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    getRepairerCompany: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: REPAIRER_COMPANY_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['RepairerCompany'],
    }),
    getRepairerCompanyDetails: builder.query({
      query: (companyId) => ({
        url: `${REPAIRER_COMPANY_URL}/${companyId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    
    createRepairerCompany: builder.mutation({
      query: () => ({
        url: `${REPAIRER_COMPANY_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['RepairerCompany'],
    }),
    updateRepairerCompany: builder.mutation({
      query: (data) => ({
        url: `${REPAIRER_COMPANY_URL}/${data.companyId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RepairerCompany'],
    }),
    uploadRepairerCompanyImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteRepairerCompany: builder.mutation({
      query: (companyId) => ({
        url: `${REPAIRER_COMPANY_URL}/${companyId}`,
        method: 'DELETE',
      }),
      providesTags: ['RepairerCompany'],
    }),
    getTopRepairerCompany: builder.query({
      query: () => `${REPAIRER_COMPANY_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});


export const {
  useGetRepairerCompanyQuery,
  useGetRepairerCompanyDetailsQuery,
  useCreateRepairerCompanyMutation,
  useUpdateRepairerCompanyMutation,
  useUploadRepairerCompanyImageMutation,
  useDeleteRepairerCompanyMutation,
  useGetTopRepairerCompanyQuery,
} = RepairerCompanyApiSlice;
