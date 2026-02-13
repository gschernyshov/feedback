import { nanoid } from '@reduxjs/toolkit'
import { addNotify, removeNotify, Notification } from './notificationSlice'
import { AppDispatch } from '@/app/providers/store'

export const addTemporary =
  ({ type, message, errorMessage }: Omit<Notification, 'id'>) =>
  (dispatch: AppDispatch) => {
    const id = nanoid()

    dispatch(addNotify({ id, type, message, errorMessage }))

    setTimeout(() => {
      dispatch(removeNotify(id))
    }, 5000)
  }
