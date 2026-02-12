import {
  validationName,
  validationEmail,
  validationMessage,
} from '@/entities/feedback/lib/validation'
import {
  CreateFeedback,
  CreateFeedbackErrors,
} from '@/entities/feedback/model/types'

export const validationCreateFeedbackForm = (data: CreateFeedback) => {
  const { name, email, message } = data
  const errors: CreateFeedbackErrors = {}

  const resultValidationName = validationName(name)
  if (resultValidationName) errors.name = resultValidationName

  const resultValidationEmail = validationEmail(email)
  if (resultValidationEmail) errors.email = resultValidationEmail

  const resultValidationMessage = validationMessage(message)
  if (resultValidationMessage) errors.message = resultValidationMessage

  return errors
}
