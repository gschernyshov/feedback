import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

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
            winston.format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`;
            }),
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
  });
  
  const config = app.get(ConfigService);

  // Настройка Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Feedback API')
    .setDescription('API для управления отзывами')
    .setVersion('1.0')
    .addTag('feedback')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document); // Доступно по /api

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляем неописанные поля
      forbidNonWhitelisted: true, // Возвращаем 400, если есть лишние поля (вместо удаления)
      transform: true, // Автоматически приводим типы (например, строки в числа)
    }),
  );

  // Разрешаем CORS-запросы только с фронтенда на http://localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  // Запускаем сервер на порту
  const port = config.get('PORT', 3005);
  await app.listen(port);
}
bootstrap();
