export const getErrorMessage = (error: unknown): string => {
  const defaultMessage = 'неизвестная ошибка сервера'

  if (!error || typeof error !== 'object') return defaultMessage

  if ('data' in error && error.data && typeof error.data === 'object') {
    const message = (error.data as { message?: unknown }).message

    if (message) {
      if (typeof message === 'string') return message.toLowerCase()

      if (Array.isArray(message)) return message.join(', ').toLowerCase()
    }
  }

  if ('status' in error && error.status) {
    const status = (error as { status: unknown }).status

    if (status === 'FETCH_ERROR') return 'ошибка сети, не удалось подключиться'
    if (status === 'TIMEOUT_ERROR') return 'превышено время ожидания'
    if (status === 'PARSING_ERROR') return 'ошибка обработки ответа сервера'
  }

  return defaultMessage
}
