import { Feedback } from '@/entities/feedback/model/types'
import { FeedbackInfo } from '@/entities/feedback/UI/FeedbackInfo'
import { Button } from '@/shared/ui/Form/Button'

interface FeedbackInfoProps {
  feedback: Feedback
  onOpenEdit: () => void
}

export const FeedbackView = ({ feedback, onOpenEdit }: FeedbackInfoProps) => {
  return (
    <div className="flex flex-col gap-3">
      <FeedbackInfo feedback={feedback} />
      <Button size="sm" type="button" disabled={false} onClick={onOpenEdit}>
        Редактировать
      </Button>
    </div>
  )
}
