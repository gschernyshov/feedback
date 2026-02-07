import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  // Базовый URL для всех запросов
  baseUrl: 'http://localhost:3001',
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })

export const baseApi = createApi({
  // Ключ для Redux-стора
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
  tagTypes: ['Feedback'],
})

/*
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export type CreateFeedbackDto = Omit<Feedback, 'id' | 'createdAt'>
export type UpdateFeedbackDto = Partial<CreateFeedbackDto>

const baseQuery = fetchBaseQuery({
  // Базовый URL для всех запросов
  baseUrl: 'http://localhost:3001',
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })

export const feedbackApi = createApi({
  // Ключ для Redux-стора
  reducerPath: 'feedbackApi',

  baseQuery: baseQueryWithRetry,

  tagTypes: ['Feedback'],

  // Определяем методы API
  endpoints: builder => ({
    createFeedback: builder.mutation<Feedback, CreateFeedbackDto>({
      query: body => ({
        url: '/feedback',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),

    findAllFeedbacks: builder.query<Feedback[], void>({
      query: () => ({
        url: '/feedback',
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Feedback' as const, id })),
              { type: 'Feedback' as const, id: 'LIST' },
            ]
          : [{ type: 'Feedback' as const, id: 'LIST' }],
      keepUnusedDataFor: 120,
    }),

    findOneFeedback: builder.query<Feedback, string>({
      query: id => ({
        url: `/feedback/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'Feedback', id }],
    }),

    updateFeedback: builder.mutation<
      Feedback,
      { id: string } & UpdateFeedbackDto
    >({
      query: ({ id, ...body }) => ({
        url: `/feedback/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Feedback', id },
        { type: 'Feedback', id: 'LIST' },
      ],
    }),

    removeFeedback: builder.mutation<void, string>({
      query: id => ({
        url: `/feedback/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Feedback', id },
        { type: 'Feedback', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useCreateFeedbackMutation,
  useFindAllFeedbacksQuery,
  useFindOneFeedbackQuery,
  useUpdateFeedbackMutation,
  useRemoveFeedbackMutation,
} = feedbackApi
*/
