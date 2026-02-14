import { useRemoveFeedbackMutation } from '../api/useRemoveFeedbackMutation'
import { type RemoveFeedback } from '@/entities/feedback/model'
import { Button } from '@/shared/UI/Form'

interface FeedbackRemoveProps {
  id: RemoveFeedback
}

export const FeedbackRemove = ({ id }: FeedbackRemoveProps) => {
  const [removeFeedback, { isLoading, isSuccess }] = useRemoveFeedbackMutation()

  const handleRemove = () => {
    removeFeedback(id)
  }

  if (isSuccess) return null

  return (
    <Button size="sm" type="button" disabled={isLoading} onClick={handleRemove}>
      {isLoading ? 'Удаляем...' : 'Удалить'}
    </Button>
  )
}
