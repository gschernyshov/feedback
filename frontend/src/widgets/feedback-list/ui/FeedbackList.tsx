'use client'

import { useFindAllFeedbacksQuery } from '../api/useFindAllFeedbacksQuery'
import { getErrorMessage } from '@/shared/lib/errors'
import { FeedbackItem } from './FeedbackItem'

export const FeedbackList = () => {
  const { isLoading, data, isError, error } = useFindAllFeedbacksQuery()

  return (
    <div className="flex flex-col justify-start gap-3 w-full max-w-xl p-3 border">
      <h2 className="text-xl font-bold">Список Feedbacks</h2>
      {isLoading ? (
        <p>Загрузка Feedbacks...</p>
      ) : isError ? (
        <p>При загрузке Feedbacks возникла ошибка: {getErrorMessage(error)}.</p>
      ) : data && data.length > 0 ? (
        data.map(feedback => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))
      ) : (
        <p>Список Feedbacks пуст...</p>
      )}
    </div>
  )
}
