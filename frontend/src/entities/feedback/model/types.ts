export interface Feedback {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export type CreateFeedback = Omit<Feedback, 'id' | 'createdAt'>
export type CreateFeedbackErrors = Partial<Record<keyof CreateFeedback, string>>

export type FindFeedback = Feedback['id']
export type FindFeedbackError = string

export type UpdateFeedback = Omit<Feedback, 'email' | 'createdAt'>
export type UpdateFeedbackErrors = Partial<Record<keyof UpdateFeedback, string>>
