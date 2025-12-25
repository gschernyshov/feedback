import { 
  Injectable, 
  BadRequestException, 
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async create(dto: CreateFeedbackDto) {
    const feedback = this.feedbackRepository.create(dto);    
    return await this.feedbackRepository.save(feedback);
  }
  
  async findAll() {
    return this.feedbackRepository.find({
      order: { 
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Некорректный формат ID');
    }

    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'message', 'createdAt'],
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback с id "${id}" не найден`);
    }
    return feedback;
  }

  async update(id: string, dto: UpdateFeedbackDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Некорректный формат ID');
    }

    const updated = await this.feedbackRepository.preload({
      id,
      ...dto,
    });

    if (!updated) {
      throw new NotFoundException(`Feedback с id "${id}" не найден`);
    }

    return this.feedbackRepository.save(updated);
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Некорректный формат ID');
    }

    const result = await this.feedbackRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Feedback с id "${id}" не найден`);
    }
  }
}