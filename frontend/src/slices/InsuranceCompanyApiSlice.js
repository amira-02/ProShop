import { INSURANCE_COMPANY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const InsuranceCompanyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInsuranceCompany: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: INSURANCE_COMPANY_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['InsuranceCompany'],
    }),
    getInsuranceCompanyDetails: builder.query({
      query: (companyId) => ({
        url: `${INSURANCE_COMPANY_URL}/${companyId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createInsuranceCompany: builder.mutation({
      query: () => ({
        url: `${INSURANCE_COMPANY_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['InsuranceCompany'],
    }),
    updateInsuranceCompany: builder.mutation({
      query: (data) => ({
        url: `${INSURANCE_COMPANY_URL}/${data.companyId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['InsuranceCompany'],
    }),
    uploadInsuranceCompanyImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteInsuranceCompany: builder.mutation({
      query: (companyId) => ({
        url: `${INSURANCE_COMPANY_URL}/${companyId}`,
        method: 'DELETE',
      }),
      providesTags: ['InsuranceCompany'],
    }),
    getTopInsuranceCompany: builder.query({
      query: () => `${INSURANCE_COMPANY_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetInsuranceCompanyQuery,
  useGetInsuranceCompanyDetailsQuery,
  useCreateInsuranceCompanyMutation,
  useUpdateInsuranceCompanyMutation,
  useUploadInsuranceCompanyImageMutation,
  useDeleteInsuranceCompanyMutation,
  useGetTopInsuranceCompanyQuery,
} = InsuranceCompanyApiSlice;
