# 📬 Feedback App

Fullstack приложение для управления отзывами (CRUD)  
Стек: **Next.js + NestJS + PostgreSQL + Docker**

---

## 🧱 Архитектура

Проект разделён на:

```
root
 ├── frontend
 ├── backend
 └── docker-compose.dev.yml
```

---

# 🚀 Frontend

## 🛠 Стек

- Next.js 16
- React 19
- Redux Toolkit
- RTK Query
- TypeScript
- TailwindCSS 4

---

## 🏗 Архитектурный подход

Frontend построен по методологии **FSD (Feature-Sliced Design)**:

```
src
 ├── app
 ├── entities
 ├── features
 ├── widgets
 ├── pages
 └── shared
```

### Основные слои:

- **app** — store, providers
- **widgets** — композиция фич (create, list, manager)
- **features** — отдельные действия (remove, notifications)
- **entities** — бизнес-сущности (feedback)
- **shared** — UI-kit, baseApi, utils

> В корне также присутствуют `app` и `pages`, чтобы соответствовать FSD и требованиям Next.

---

## 🔄 Работа с API

Используется **RTK Query**:

- `useFindAllFeedbacksQuery`
- `useLazyFindOneFeedbackQuery`
- `useCreateFeedbackMutation`
- `useUpdateFeedbackMutation`
- `useRemoveFeedbackMutation`

Базовая настройка через `shared/api/baseApi.ts`.

---

## 🔐 Environment Variables

### 🖥 Frontend (.env — опционально)

При необходимости можно создать файл:

```
frontend/.env
```

И указать:

```env
NEXT_PUBLIC_BACKEND_URL=
```

> Если переменная не указана — используется значение по умолчанию - `http://localhost:3001`.

### ⚙ Backend (.env — обязательно)

В папке `backend` необходимо создать файл:

```
backend/.env
```

Со следующим содержимым:

```env
CORS_ORIGINS=

PORT=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

---

## 📦 Запуск фронта локально

```bash
cd frontend
npm install
npm run dev
```

Доступно на:

```
http://localhost:3000
```

---

# ⚙ Backend

## 🛠 Стек

- NestJS 11
- TypeORM
- PostgreSQL 18
- Swagger
- Winston

---

## 🏗 Структура

```
src
 ├── feedback
 │   ├── dto
 │   ├── entities
 │   ├── feedback.controller.ts
 │   ├── feedback.service.ts
 │   └── feedback.module.ts
 ├── app.module.ts
 └── main.ts
```

### Реализовано:

- CRUD для feedback
- DTO + валидация
- TypeORM entity
- Swagger документация
- Unit тест для service

---

## 📦 Запуск бека локально

```bash
cd backend
npm install
npm run start:dev
```

Доступно на:

```
http://localhost:3001
```

Swagger:

```
http://localhost:3001/api
```

---

# 🐳 Docker

## docker-compose.dev

Поднимаются 3 сервиса:

- `frontend` → 3000
- `backend` → 3001
- `db` → Postgres 18

### Запуск всего проекта:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

После запуска:

- Frontend → http://localhost:3000
- Backend → http://localhost:3001
- PostgreSQL → 5432

---

## 🗄 База данных

Postgres:

```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

Данные сохраняются в volume:

```
postgres_data
```

---

# 🧪 Скрипты

## Backend

```bash
npm run start:dev
npm run build
npm run test
npm run test:cov
npm run lint
npm run format
```

## Frontend

```bash
npm run dev
npm run build
npm run lint
npm run format
```

---

# ✨ Возможности

- Создание отзыва
- Просмотр списка
- Поиск по ID
- Редактирование
- Удаление
- Toast-уведомления
- Валидация на фронте и беке
- Swagger документация
- Docker окружение
- FSD архитектура

---

# 📌 Версии

- Node 24 (alpine)
- Next 16
- React 19
- Nest 11
- Postgres 18

---

# 📄 License

UNLICENSED
