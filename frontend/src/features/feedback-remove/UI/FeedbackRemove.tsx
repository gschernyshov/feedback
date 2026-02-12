import { useRemoveFeedbackMutation } from '../api/api'
import { Feedback } from '@/entities/feedback/model/types'
import { Button } from '@/shared/ui/Form/Button'
import { Toast } from '@/shared/ui/Toast'
import { getErrorMessage } from '@/shared/lib/errors'

interface FeedbackRemoveProps {
  id: Feedback['id']
}

export const FeedbackRemove = ({ id }: FeedbackRemoveProps) => {
  const [removeFeedback, { isLoading, isSuccess, isError, error }] =
    useRemoveFeedbackMutation()

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

      {isSuccess && (
        <Toast
          isSuccess={false}
          infoText={`Feedback c id=${id} успешно удалён`}
          errorMessage={getErrorMessage(error)}
        />
      )}

      {isError && (
        <Toast
          isSuccess={false}
          infoText={`При удалении Feedback c id=${id} возникла ошибка`}
          errorMessage={getErrorMessage(error)}
        />
      )}
    </>
  )
}
