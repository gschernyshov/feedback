import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  // Ключ для Redux-стора
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({ 
    // Базовый URL для всех запросов
    baseUrl: 'http://localhost:3001',
  }),
  // Определяем методы API
  endpoints: (builder) => ({
    // Мутация: отправка данных
    sendFeedback: builder.mutation<
      { success: boolean },
      { name: string; email: string; message: string }
    >({
      query: (body) => ({
        url: '/feedback',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendFeedbackMutation } = feedbackApi;
