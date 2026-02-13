import {
  validationId,
  validationMessage,
  validationName,
} from '@/entities/feedback/lib/validation'
import {
  type FindFeedbackError,
  type UpdateFeedback,
  type UpdateFeedbackErrors,
} from '@/entities/feedback/model'

export const validationSearch = (id: FindFeedbackError) => {
  return validationId(id)
}

export const validationEdit = (data: UpdateFeedback) => {
  const { name, message } = data
  const errors: UpdateFeedbackErrors = {}

  const resultValidationName = validationName(name)
  if (resultValidationName) errors.name = resultValidationName

  const resultValidationMessage = validationMessage(message)
  if (resultValidationMessage) errors.message = resultValidationMessage

  return errors
}
