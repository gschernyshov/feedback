import { 
  Injectable, 
  BadRequestException, 
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);
  
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async create(dto: CreateFeedbackDto) {
    this.logger.log('Создание нового feedback');
    const feedback = this.feedbackRepository.create(dto);  
    const saved = await this.feedbackRepository.save(feedback);
    this.logger.debug(`Feedback создан с ID: ${saved.id}`);  
    return saved;
  }
  
  async findAll() {
    this.logger.log('Получение всех feedbacks');
    const feedbacks =  await this.feedbackRepository.find({
      order: { 
        createdAt: 'DESC',
      },
    });
    this.logger.debug(`Найдено ${feedbacks.length} записей`);
    return feedbacks;
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      const message = 'Некорректный формат ID';
      this.logger.warn(`Попытка доступа к feedback с некорректным ID: ${id}`);
      throw new BadRequestException(message);
    }

    this.logger.log(`Поиск feedback с ID: ${id}`);
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'message', 'createdAt'],
    });

    if (!feedback) {
      this.logger.warn(`Feedback с ID "${id}" не найден`);
      throw new NotFoundException(`Feedback с id "${id}" не найден`);
    }

    this.logger.debug(`Feedback найден: ${feedback.name}, ${feedback.email}`);
    return feedback;
  }

  async update(id: string, dto: UpdateFeedbackDto) {
    if (!isUUID(id)) {
      this.logger.warn(`Попытка обновления feedback с некорректным ID: ${id}`);
      throw new BadRequestException('Некорректный формат ID');
    }

    this.logger.log(`Обновление feedback с ID: ${id}`);
    const updated = await this.feedbackRepository.preload({
      id,
      ...dto,
    });

    if (!updated) {
      this.logger.warn(`Feedback с ID "${id}" не найден при обновлении`);
      throw new NotFoundException(`Feedback с id "${id}" не найден`);
    }

    const result = await this.feedbackRepository.save(updated);
    this.logger.log(`Feedback с ID ${id} успешно обновлён`);
    return result;
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      this.logger.warn(`Попытка удаления feedback с некорректным ID: ${id}`);
      throw new BadRequestException('Некорректный формат ID');
    }

    this.logger.log(`Удаление feedback с ID: ${id}`);
    const result = await this.feedbackRepository.delete(id);

    if (result.affected === 0) {
      this.logger.warn(`Feedback с ID "${id}" не найден при удалении`);
      throw new NotFoundException(`Feedback с id "${id}" не найден`);
    }

    this.logger.log(`Feedback с ID ${id} успешно удалён`);
  }
}