import { isEmail } from '@/shared/lib/validation'
import { CreateFeedback, CreateFeedbackErrors } from './types'

export const validationCreateFeedbackForm = (data: CreateFeedback) => {
  const { name, email, message } = data
  const errors: CreateFeedbackErrors = {}

  const nameLength = name.trim().length
  if (!name || nameLength === 0) {
    errors.name = 'Имя обязательно'
  } else if (nameLength > 100) {
    errors.name = 'Имя не должно превышать 100 символов'
  }

  const emailLength = email.trim().length
  if (!email || emailLength === 0) {
    errors.email = 'Email обязателен'
  } else if (emailLength > 100) {
    errors.email = 'Email не должен превышать 100 символов'
  } else if (!isEmail(email)) {
    errors.email = 'Некорректный формат Email'
  }

  const messageLength = message.trim().length
  if (!message || messageLength === 0) {
    errors.message = 'Сообщение обязательно'
  } else if (messageLength < 10) {
    errors.message = 'Сообщение должно содержать минимум 10 символов'
  } else if (messageLength > 1000) {
    errors.message = 'Сообщение не должно превышать 1000 символов'
  }

  return errors
}
