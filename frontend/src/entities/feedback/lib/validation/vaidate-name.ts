export const validationName = (name: string) => {
  const lengthName = name.trim().length

  if (lengthName === 0) {
    return 'Имя обязательно'
  }

  if (lengthName > 100) {
    return 'Имя не должно превышать 100 символов'
  }

  const invalidChars = name.match(/[^а-яА-ЯёЁ\s\-]/gu)
  if (invalidChars) {
    const unique = [...new Set(invalidChars)]
    return `Имя содержит недопустимые символы: ${[...unique].join(', ')}`
  }

  return null
}
