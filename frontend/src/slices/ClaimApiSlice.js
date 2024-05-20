import { CLAIM_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ClaimApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClaims: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: CLAIM_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Claim'],
      onQueryError: (error) => {
        // Handle query errors
        console.error('Error fetching claims:', error);
      },
    }),

    getClaimById: builder.query({
      query: (claimId) => ({
        url: `${CLAIM_URL}/${claimId}`,
      }),
      keepUnusedDataFor: 5,
      onQueryError: (error) => {
        // Handle query errors
        console.error('Error fetching claim by ID:', error);
      },
    }),

    getClaimsByUserId: builder.query({
      query: ({ userId, pageNumber }) => ({
        url: `/api/claim/user/${userId}`,
        params: { userId, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Claim'],
      onQueryError: (error) => {
        // Handle query errors
        console.error('Error fetching claims by user ID:', error);
      },
    }),

    getCompanyIdByClaimId: builder.query({
      query: (claimId) => ({
        url: `/api/claim/company/${claimId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Claim'],
      onQueryError: (error) => {
        // Handle query errors
        console.error('Error fetching company ID by claim ID:', error);
      },
    }),

    getClaimCount: builder.query({
      query: ({ companyId }) => ({
        url: `/api/claim/count/${companyId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Claim'],
      onQueryError: (error) => {
        // Handle query errors
        console.error('Error fetching claim count:', error);
      },
    }),

    createClaim: builder.mutation({
      query: (data) => ({
        url: `${CLAIM_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Claim'],
      onQueryError: (error) => {
        // Handle mutation errors
        console.error('Error creating claim: from api slice ', error);
      },
    }),

    updateClaim: builder.mutation({
      query: ({ claimId, orderId, itemIndex, description }) => ({
        url: `${CLAIM_URL}/${claimId}`,
        method: 'PUT',
        body: { orderId, itemIndex, description },
      }),
      invalidatesTags: ['Claim'],
      onQueryError: (error) => {
        // Handle mutation errors
        console.error('Error updating claim:', error);
      },
    }),
    

    deleteClaim: builder.mutation({
      query: (claimId) => ({
        url: `${CLAIM_URL}/${claimId}`,
        method: 'DELETE',
      }),
      providesTags: ['Claim'],
      onQueryError: (error) => {
        // Handle mutation errors
        console.error('Error deleting claim:', error);
      },
    }),

    getTopClaims: builder.query({
      query: () => ({
        url: `${CLAIM_URL}/top`,
      }),
      keepUnusedDataFor: 5,
      onQueryError: (error) => {
        // Handle query errors
        console.error('Error fetching top claims:', error);
      },
    }),
  }),
});

export const {
  useGetClaimsQuery,
  useGetClaimByIdQuery,
  useGetClaimsByUserIdQuery,
  useGetCompanyIdByClaimIdQuery,
  useGetClaimCountQuery,
  useCreateClaimMutation,
  useUpdateClaimMutation,
  useDeleteClaimMutation,
  useGetTopClaimsQuery,
} = ClaimApiSlice;
