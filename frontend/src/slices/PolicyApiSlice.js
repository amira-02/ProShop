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
    getPolicyCount: builder.query({
      query: () => `${POLICY_URL}/count`, // API URL to fetch the count
      transformResponse: (response) => response.count, // Extract count from response
      keepUnusedDataFor: 5,
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
        url: `/api/upload`,
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
      query: () => `${POLICY_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
}); 

export const {
  useGetPolicyQuery,
  useGetPolicyDetailsQuery,
  useCreatePolicyMutation,
  useUpdatePolicyMutation,
  useUploadPolicyImageMutation,
  useDeletePolicyMutation,
  useCreateReviewMutation,
  useGetTopPolicyQuery,
  useGetPolicyCountQuery, // Include the Policy count query
} = PolicyApiSlice;
