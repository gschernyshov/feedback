import { addTemporary } from '@/features/notifications/model'
import {
  markAsDeleted,
  unmarkAsDeleted,
  type RemoveFeedback,
} from '@/entities/feedback/model'
import { baseApi } from '@/shared/api/baseApi'
import { getErrorMessage } from '@/shared/lib/errors'

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
          dispatch(
            addTemporary({
              type: 'success',
              message: `Feedback с id: ${id} успешно удалён`,
            }),
          )
        } catch (error) {
          dispatch(unmarkAsDeleted(id))
          dispatch(
            addTemporary({
              type: 'error',
              message: `При удалении Feedback c id: ${id} возникла ошибка`,
              errorMessage: getErrorMessage(error),
            }),
          )
        }
      },
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),
  }),
})

export const { useRemoveFeedbackMutation } = feedbackApi
