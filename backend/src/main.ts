import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  // Создаём экземпляр NestJS-приложения на основе корневого модуля
  const app = await NestFactory.create(AppModule, {
    // Подключаем winston как логгер
    logger: WinstonModule.createLogger({
      transports: [
        // Логи в консоль
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(
              ({
                timestamp,
                level,
                message,
              }: {
                timestamp: string
                level: string
                message: string | object
              }) => {
                const msg =
                  typeof message === 'object'
                    ? JSON.stringify(message)
                    : message
                return `[${timestamp}] ${level}: ${msg}`
              },
            ),
          ),
        }),
        // Логи в файл
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error', // error и выше
          format: winston.format.json(),
        }),
        new winston.transports.File({
          filename: 'logs/all.log',
          level: 'info', // info и выше
          format: winston.format.json(),
        }),
      ],
    }),
  })

  const config = app.get(ConfigService)

  // Настройка Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Feedback API')
    .setDescription('API для управления отзывами')
    .setVersion('1.0')
    .addTag('feedback')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document) // Доступно по /api

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляем неописанные поля
      forbidNonWhitelisted: true, // Возвращаем 400, если есть лишние поля (вместо удаления)
      transform: true, // Автоматически приводим типы (например, строки в числа)
    }),
  )

  // Разрешаем CORS-запросы только с фронтенда
  app.enableCors({
    origin: config.get<string | string[]>(
      'CORS_ORIGINS',
      'http://localhost:3000',
    ),
  })

  // Запускаем сервер на порту
  const port = config.get<number>('PORT', 3001)
  await app.listen(port)
}

bootstrap().catch(error => {
  console.error('При запуске приложения возникла ошибка: ', error)
})
