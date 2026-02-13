'use client'

import { selectNotifications, removeNotify } from '../model'
import { Toast } from './Toast'
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks'
import { Feedback } from '@/entities/feedback/model/types'

export const ToastContainer = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectNotifications)

  const handleRemove = (id: Feedback['id']) => {
    dispatch(removeNotify(id))
  }

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-3">
      {notifications.map(notify => (
        <Toast
          key={notify.id}
          type={notify.type}
          message={notify.message}
          errorMessage={notify.errorMessage}
          onClick={() => handleRemove(notify.id)}
        />
      ))}
    </div>
  )
}
