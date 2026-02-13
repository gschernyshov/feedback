import { formattedDate } from '../lib/format-date'
import { type Feedback } from '../model/types'

interface FeedbackInfoProps {
  feedback: Feedback
}

export const FeedbackInfo = ({ feedback }: FeedbackInfoProps) => {
  return (
    <div className="w-full p-3 border">
      <p className="border-b text-md font-bold">Feedback c id: {feedback.id}</p>
      <ul className="py-2">
        <li>Имя: {feedback.name}</li>
        <li>Email: {feedback.email}</li>
        <li>Сообщение: {feedback.message}</li>
      </ul>
      <p className="border-t text-sm text-gray-600">
        От: {formattedDate(feedback.createdAt)}
      </p>
    </div>
  )
}
