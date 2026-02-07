import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity('feedbacks')
export class Feedback {
  @ApiProperty({
    description: 'Уникальный идентификатор (UUID)',
    example: '290bb113-b43b-45db-83ba-e1e7fdf6e719',
    readOnly: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: 'Имя автора',
    example: 'Иван Петров',
    minLength: 1,
    maxLength: 100,
  })
  @Column()
  name: string

  @ApiProperty({
    description: 'Email для обратной связи',
    example: 'ivan@example.com',
    format: 'email',
    minLength: 1,
    maxLength: 100,
  })
  @Column()
  email: string

  @ApiProperty({
    description: 'Текст сообщения',
    example: 'Отличный сервис, всё работает быстро!',
    minLength: 10,
    maxLength: 1000,
  })
  @Column()
  message: string

  @ApiProperty({
    description: 'Дата и время создания (UTC)',
    example: '2025-04-05T12:34:56.789Z',
    format: 'date-time',
    readOnly: true,
  })
  @CreateDateColumn()
  createdAt: Date
}
