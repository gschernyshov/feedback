import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Создаём экземпляр NestJS-приложения на основе корневого модуля
  const app = await NestFactory.create(AppModule);
  
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
