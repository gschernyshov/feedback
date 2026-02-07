import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'

// Создаём хранилище Redux
export const store = configureStore({
  // Определяем редюсеры — функции, которые обновляют состояние
  reducer: {
    // Добавляем редюсер из feedbackApi под его уникальным путём
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // Настраиваем middleware — промежуточное ПО для расширения функциональности
  middleware: getDefault =>
    // Получаем стандартные middleware (например, thunk, devTools)
    getDefault()
      // Добавляем middleware от feedbackApi — он отвечает за
      // кэширование, повторные запросы, управление состоянием запросов
      .concat(baseApi.middleware),
})
