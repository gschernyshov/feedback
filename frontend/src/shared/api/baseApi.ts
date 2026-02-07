import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  // Базовый URL для всех запросов
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001',
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })

export const baseApi = createApi({
  // Ключ для Redux-стора
  reducerPath: 'api',
  
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
  tagTypes: ['Feedback'],
})