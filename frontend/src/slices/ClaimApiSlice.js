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
    }),

    getClaimById: builder.query({
      query: (claimId) => ({
        url: `${CLAIM_URL}/${claimId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getClaimsByUserId: builder.query({
      query: ({ userId, pageNumber }) => ({
        url: `/api/claim/user/${userId}`,
        params: { userId, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Claim'],
    }),

    getCompanyIdByClaimId: builder.query({
      query: (claimId) => ({
        url: `/api/claim/company/${claimId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Claim'],
    }),

    getClaimCount: builder.query({
      query: ({ companyId }) => ({
        url: `/api/claim/count/${companyId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Claim'],
    }),

    createClaim: builder.mutation({
      query: (data) => ({
        url: `${CLAIM_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Claim'],
    }),

    updateClaim: builder.mutation({
      query: (data) => ({
        url: `${CLAIM_URL}/${data.claimId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Claim'],
    }),

    deleteClaim: builder.mutation({
      query: (claimId) => ({
        url: `${CLAIM_URL}/${claimId}`,
        method: 'DELETE',
      }),
      providesTags: ['Claim'],
    }),

    getTopClaims: builder.query({
      query: () => ({
        url: `${CLAIM_URL}/top`,
      }),
      keepUnusedDataFor: 5,
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
