import { type RootState } from '@/app/providers/store'

export const selectDeletedIds = (state: RootState) => state.feedback.deletedIds
