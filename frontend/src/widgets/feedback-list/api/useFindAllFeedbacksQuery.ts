import { Feedback } from '@/entities/feedback/model/types'
import { baseApi } from '@/shared/api/baseApi'

const feedbackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    findAllFeedbacks: builder.query<Feedback[], void>({
      query: () => ({
        url: '/feedback',
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Feedback' as const, id })),
              { type: 'Feedback' as const, id: 'LIST' },
            ]
          : [{ type: 'Feedback' as const, id: 'LIST' }],
      keepUnusedDataFor: 120,
    }),
  }),
})

export const { useFindAllFeedbacksQuery } = feedbackApi
