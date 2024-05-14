import { POLICY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const PolicyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPolicy: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: POLICY_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Policy'],
    }),

    getPolicyByType: builder.query({
      query: ({ type, pageNumber }) => ({
        url: POLICY_URL,
        params: { type, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Policy'],
    }),

    getPolicyByCompanyId: builder.query({
      query: ({ companyId, pageNumber }) => ({
        url: `/api/Policy/company/${companyId}`,
        params: { companyId, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Policy'],
    }),

    getPolicyCount: builder.query({
      query: ({ companyId }) => ({
        url: `/api/Policy/count/${companyId}`,
        params: { companyId },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Policy'],
    }),


    getPolicyDetails: builder.query({
      query: (PolicyId) => ({
        url: `${POLICY_URL}/${PolicyId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createPolicy: builder.mutation({
      query: () => ({
        url: `${POLICY_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Policy'],
    }),

    updatePolicy: builder.mutation({
      query: (data) => ({
        url: `${POLICY_URL}/${data.PolicyId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Policy'],
    }),

    uploadPolicyImage: builder.mutation({
      query: (data) => ({
        url: '/api/upload',
        method: 'POST',
        body: data,
      }),
    }),

    deletePolicy: builder.mutation({
      query: (PolicyId) => ({
        url: `${POLICY_URL}/${PolicyId}`,
        method: 'DELETE',
      }),
      providesTags: ['Policy'],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${POLICY_URL}/${data.PolicyId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Policy'],
    }),

    getTopPolicy: builder.query({
      query: ({ companyId }) => ({
        url: `${POLICY_URL}/top`,
        params: { companyId },
      }),
      keepUnusedDataFor: 5,
    }),

    getPolicyById: builder.query({
      query: (PolicyId) => ({
        url: `${POLICY_URL}/${PolicyId}`,
      }),
      keepUnusedDataFor: 5,
    }),

  }),
});

export const {
  useGetPolicyQuery,
  useGetPolicyByTypeQuery,
  useGetPolicyByCompanyIdQuery,
  useGetPolicyCountQuery,
  useGetPolicyDetailsQuery,
  useCreatePolicyMutation,
  useUpdatePolicyMutation,
  useUploadPolicyImageMutation,
  useDeletePolicyMutation,
  useCreateReviewMutation,
  useGetTopPolicyQuery,
  useGetPolicyByIdQuery,
} = PolicyApiSlice;
