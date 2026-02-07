import { Feedback } from '@/entities/feedback/model/types'

export type CreateFeedback = Omit<Feedback, 'id' | 'createdAt'>

export type CreateFeedbackErrors = Partial<Record<keyof CreateFeedback, string>>
