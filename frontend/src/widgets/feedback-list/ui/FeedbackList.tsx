'use client'

import { useFindAllFeedbacksQuery } from '../api/useFindAllFeedbacksQuery'
import { getErrorMessage } from '@/shared/lib/errors'
import { FeedbackItem } from './FeedbackItem'

export const FeedbackList = () => {
  const { isLoading, data, isError, error } = useFindAllFeedbacksQuery()

  if (isLoading) {
    return <p>Загрузка Feedbacks</p>
  }

  if (isError) {
    return <p>{getErrorMessage(error)}</p>
  }

  return (
    <div className="flex flex-col justify-start gap-3 w-full max-w-xl p-3 border">
      {data &&
        data.map(feedback => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))}

      {!data && <p>Список Feedbacks пуст...</p>}
    </div>
  )
}
