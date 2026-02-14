import { useRemoveFeedbackMutation } from '../api/useRemoveFeedbackMutation'
import { type RemoveFeedback } from '@/entities/feedback/model'
import { Button } from '@/shared/UI/Form'

interface FeedbackRemoveProps {
  id: RemoveFeedback
}

export const FeedbackRemove = ({ id }: FeedbackRemoveProps) => {
  const [removeFeedback, { isLoading }] = useRemoveFeedbackMutation()

  const handleRemove = () => {
    removeFeedback(id)
  }

  return (
    <Button size="sm" type="button" disabled={isLoading} onClick={handleRemove}>
      {isLoading ? 'Удаляем...' : 'Удалить'}
    </Button>
  )
}
