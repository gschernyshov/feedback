import { FeedbackRemove } from '@/features/feedback-remove'
import { type Feedback } from '@/entities/feedback/model'
import { FeedbackInfo } from '@/entities/feedback/UI/FeedbackInfo'
import { Button } from '@/shared/UI/Form'

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
