import { configureStore } from '@reduxjs/toolkit';
import { feedbackApi } from '@/src/shared/api/feedbackApi';

// Создаём хранилище Redux
export const store = configureStore({
  // Определяем редюсеры — функции, которые обновляют состояние
  reducer: {
    // Добавляем редюсер из feedbackApi под его уникальным путём
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  // Настраиваем middleware — промежуточное ПО для расширения функциональности
  middleware: (getDefault) =>
    // Получаем стандартные middleware (например, thunk, devTools)
    getDefault()
      // Добавляем middleware от feedbackApi — он отвечает за
      // кэширование, повторные запросы, управление состоянием запросов
      .concat(feedbackApi.middleware),
});
