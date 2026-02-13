import { type Feedback, type FindFeedback } from '@/entities/feedback/model'
import { baseApi } from '@/shared/api/baseApi'

const feedbackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    findOneFeedback: builder.query<Feedback, FindFeedback>({
      query: id => ({
        url: `/feedback/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'Feedback', id }],
    }),
  }),
})

export const { useLazyFindOneFeedbackQuery } = feedbackApi
