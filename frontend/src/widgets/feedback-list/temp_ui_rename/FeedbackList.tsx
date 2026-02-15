'use client'

import { useFindAllFeedbacksQuery } from '../api/useFindAllFeedbacksQuery'
import { FeedbackRemove } from '@/features/feedback-remove'
import { FeedbackInfo } from '@/entities/feedback/UI/FeedbackInfo'
import { getErrorMessage } from '@/shared/lib/errors'

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
          <div key={feedback.id} className="flex flex-col items-end gap-1">
            <FeedbackInfo feedback={feedback} />
            <FeedbackRemove id={feedback.id} />
          </div>
        ))
      ) : (
        <p>Список Feedbacks пуст...</p>
      )}
    </div>
  )
}
