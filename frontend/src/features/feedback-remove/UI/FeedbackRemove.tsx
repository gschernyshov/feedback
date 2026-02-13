import { useEffect } from 'react'
import { useRemoveFeedbackMutation } from '../api/api'
import { useAppDispatch } from '@/app/providers/store'
import { addTemporary } from '@/features/notifications/model'
import { type RemoveFeedback } from '@/entities/feedback/model'
import { getErrorMessage } from '@/shared/lib/errors'
import { Button } from '@/shared/UI/Form/Button'

interface FeedbackRemoveProps {
  id: RemoveFeedback
}

export const FeedbackRemove = ({ id }: FeedbackRemoveProps) => {
  const dispatch = useAppDispatch()
  const [removeFeedback, { isLoading, isSuccess, data, isError, error }] =
    useRemoveFeedbackMutation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        addTemporary({
          type: 'success',
          message: `Feedback с id: ${id} успешно удалён`,
        }),
      )
    }
  }, [id, isSuccess, data, dispatch])

  useEffect(() => {
    if (isError) {
      dispatch(
        addTemporary({
          type: 'error',
          message: `При удалении Feedback c id: ${id} возникла ошибка`,
          errorMessage: getErrorMessage(error),
        }),
      )
    }
  }, [id, isError, error, dispatch])

  const handleRemove = () => {
    removeFeedback(id)
  }

  if (isSuccess) return null

  return (
    <>
      <Button
        size="sm"
        type="button"
        disabled={isLoading}
        onClick={handleRemove}
      >
        {isLoading ? 'Удаляем...' : 'Удалить'}
      </Button>
    </>
  )
}
