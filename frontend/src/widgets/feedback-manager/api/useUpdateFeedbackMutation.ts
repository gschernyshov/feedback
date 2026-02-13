import { type Feedback, type UpdateFeedback } from '@/entities/feedback/model'
import { baseApi } from '@/shared/api/baseApi'

const feedbackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateFeedback: builder.mutation<Feedback, UpdateFeedback>({
      query: ({ id, ...body }) => ({
        url: `/feedback/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Feedback', id },
        { type: 'Feedback', id: 'LIST' },
      ],
    }),
  }),
})

export const { useUpdateFeedbackMutation } = feedbackApi
