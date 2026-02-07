import { Module } from '@nestjs/common'
import { FeedbackController } from './feedback.controller'
import { FeedbackService } from './feedback.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Feedback } from './entities/feedback.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    // [ConfigModule],
  ],
  controllers: [FeedbackController], // Обрабатывает HTTP-запросы
  providers: [FeedbackService], // Предоставляет бизнес-логику
})
export class FeedbackModule {}
