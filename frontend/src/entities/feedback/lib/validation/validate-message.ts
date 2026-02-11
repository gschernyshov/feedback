export const validationMessage = (message: string) => {
  const messageLength = message.length

  if (messageLength === 0) {
    return 'Сообщение обязательно'
  }

  if (messageLength < 10) {
    return 'Сообщение должно содержать минимум 10 символов'
  }

  if (messageLength > 100) {
    return 'Сообщение не должно превышать 100 символов'
  }

  const invalidChars = message.match(/[^а-яА-ЯёЁ\s\-,.]/gu)
  if (invalidChars) {
    const unique = [...new Set(invalidChars)]
    return `Сообщение содержит недопустимые символы: ${unique.join(', ')}`
  }

  return null
}
