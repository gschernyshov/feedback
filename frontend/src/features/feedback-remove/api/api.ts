import { RemoveFeedback } from '@/entities/feedback/model/types'
import { baseApi } from '@/shared/api/baseApi'

const feedbackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    removeFeedback: builder.mutation<void, RemoveFeedback>({
      query: id => ({
        url: `/feedback/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Feedback', id },
        { type: 'Feedback', id: 'LIST' },
      ],
    }),
  }),
})

export const { useRemoveFeedbackMutation } = feedbackApi
