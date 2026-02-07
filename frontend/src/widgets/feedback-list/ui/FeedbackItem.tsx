import { formattedDate } from '@/entities/feedback/lib/format-date'
import { Feedback } from '@/entities/feedback/model/types'

interface FeedbackItemProps {
  feedback: Feedback
}

export const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  return (
    <div className="p-3 border">
      <p className="border-b text-md font-bold">Feedback c id: {feedback.id}</p>
      <ul className="py-2">
        <li>Имя: {feedback.name}</li>
        <li>Email: {feedback.email}</li>
        <li>Сообщение: {feedback.message}</li>
      </ul>
      <p className="border-t text-sm font-bold text-gray-400">
        От: {formattedDate(feedback.createdAt)}
      </p>
    </div>
  )
}
