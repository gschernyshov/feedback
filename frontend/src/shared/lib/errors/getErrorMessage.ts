export const getErrorMessage = (
  error: unknown,
  defaultMessage = 'Неизвестная ошибка!',
): string => {
  if (!error || typeof error !== 'object') return defaultMessage

  if ('data' in error && error.data && typeof error.data === 'object') {
    const message = (error.data as { message?: unknown }).message

    if (message) {
      if (typeof message === 'string') return message

      if (Array.isArray(message)) return message.join(', ')
    }
  }

  if ('status' in error && error.status) {
    const status = (error as { status: unknown }).status

    if (status === 'FETCH_ERROR') return 'Ошибка сети. Не удалось подключиться'
    if (status === 'TIMEOUT_ERROR') return 'Превышено время ожидания'
    if (status === 'PARSING_ERROR') return 'Ошибка обработки ответа сервера'
  }

  return defaultMessage
}
