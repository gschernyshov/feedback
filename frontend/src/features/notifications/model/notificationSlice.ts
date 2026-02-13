import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationType } from './types'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  errorMessage?: string
}

const initialState: Notification[] = []

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter(notify => notify.id !== action.payload)
    },
  },
})

export const { add: addNotify, remove: removeNotify } =
  notificationSlice.actions
