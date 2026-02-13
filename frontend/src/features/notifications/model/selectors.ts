import { type RootState } from '@/app/providers/store'

export const selectNotifications = (state: RootState) => state.notifications
