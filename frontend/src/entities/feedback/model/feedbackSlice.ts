import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type Feedback } from '.'

interface FeedbackState {
  deletedIds: Feedback['id'][]
}

const initialState: FeedbackState = {
  deletedIds: [],
}

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: initialState,
  reducers: {
    markAsDeleted: (state, action: PayloadAction<Feedback['id']>) => {
      state.deletedIds.push(action.payload)
    },
    unmarkAsDeleted: (state, action: PayloadAction<Feedback['id']>) => {
      return {
        ...state,
        deletedIds: state.deletedIds.filter(id => id !== action.payload),
      }
    },
  },
})

export const { markAsDeleted, unmarkAsDeleted } = feedbackSlice.actions
