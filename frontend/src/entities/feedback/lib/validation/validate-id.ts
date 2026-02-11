export const validationId = (id: string) => {
  const lengthId = id.length

  if (lengthId === 0) {
    return 'Id обязателен'
  }

  if (lengthId > 100) {
    return 'Длина Id не должна превышать 100 символов'
  }

  if (
    !/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(id)
  ) {
    return 'Id должен быть в формате UUID'
  }

  return null
}
