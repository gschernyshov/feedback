import { FeedbackRemove } from '@/features/feedback-remove'
import { Feedback } from '@/entities/feedback/model/types'
import { FeedbackInfo } from '@/entities/feedback/UI/FeedbackInfo'
import { Button } from '@/shared/UI/Form/Button'

interface FeedbackInfoProps {
  feedback: Feedback
  onOpenEdit: () => void
}

export const FeedbackView = ({ feedback, onOpenEdit }: FeedbackInfoProps) => {
  return (
    <div className="flex flex-col gap-1">
      <FeedbackInfo feedback={feedback} />
      <div className="flex items-stretch gap-1 ">
        <Button size="sm" type="button" disabled={false} onClick={onOpenEdit}>
          Редактировать
        </Button>
        <FeedbackRemove id={feedback.id} />
      </div>
    </div>
  )
}
