import { isEmail } from '@/shared/lib/validation'

export const validationEmail = (email: string) => {
  const lengthEmail = email.length

  if (lengthEmail === 0) {
    return 'Email обязателен'
  }

  if (lengthEmail > 100) {
    return 'Email не должен превышать 100 символов'
  }

  if (!isEmail(email)) {
    return 'Некорректный формат Email'
  }

  return null
}
