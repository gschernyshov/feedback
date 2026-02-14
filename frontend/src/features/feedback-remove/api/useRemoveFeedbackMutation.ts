import {
  markAsDeleted,
  unmarkAsDeleted,
  type RemoveFeedback,
} from '@/entities/feedback/model'
import { baseApi } from '@/shared/api/baseApi'

const feedbackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    removeFeedback: builder.mutation<void, RemoveFeedback>({
      query: id => ({
        url: `/feedback/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(markAsDeleted(id))
        try {
          await queryFulfilled
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          dispatch(unmarkAsDeleted(id))
        }
      },
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),
  }),
})

export const { useRemoveFeedbackMutation } = feedbackApi
