import { Length, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Имя автора',
    example: 'Иван Петров',
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: 'Некорректное имя' })
  @Length(1, 100, { message: 'Имя должно быть от 1 до 100 символов' })
  name: string;

  @ApiProperty({
    description: 'Email для обратной связи',
    example: 'ivan@example.com',
    format: 'email',
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: 'Некорректный email' })
  @IsEmail({}, { message: 'Некорректный формат email' })
  @Length(1, 100, { message: 'Email не должен превышать 100 символов' })
  email: string;

  @ApiProperty({
    description: 'Текст сообщения',
    example: 'Отличный сервис, всё работает быстро!',
    minLength: 10,
    maxLength: 1000,
  })
  @IsString({ message: 'Некорректное сообщение' })
  @Length(10, 1000, { message: 'Сообщение должно быть от 10 до 1000 символов' })
  message: string;
}