import { baseApi } from '@/shared/api/baseApi'
import { Feedback } from '@/entities/feedback/model/types'
import { CreateFeedback } from '../model/types'

const feedbackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createFeedback: builder.mutation<Feedback, CreateFeedback>({
      query: body => ({
        url: '/feedback',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),
  }),
})

export const { useCreateFeedbackMutation } = feedbackApi
