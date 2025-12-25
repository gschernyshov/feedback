import { 
  Body, 
  Controller, 
  Post, 
  Get, 
  Put,
  Delete, 
  HttpCode, 
  Param,
  Header,
  Logger, 
} from '@nestjs/common';
import { 
  ApiTags,
  ApiOperation, 
  ApiParam, 
  ApiResponse,
} from '@nestjs/swagger';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { FeedbackService } from './feedback.service';

@ApiTags('feedback') // Группировка в Swagger UI
@Controller('feedback') // Базовый маршрут: /feedback
export class FeedbackController {
  private readonly logger = new Logger(FeedbackController.name);
  
  // Инжектируем сервис для бизнес-логики
  constructor(private readonly service: FeedbackService) {}
  /*
  private readonly service: FeedbackService;

  constructor(service: FeedbackService) {
    this.service = service;
  }
  */

  // POST /feedback 
  @Post()
  @ApiOperation({ summary: 'Создать feedback' })
  @ApiResponse({
    status: 201,
    description: 'Feedback успешно создан',
    type: Feedback,
  })
  create(@Body() dto: CreateFeedbackDto) {
    this.logger.log('POST /feedback', dto);
    return this.service.create(dto);
  }

  // GET /feedback 
  @Get()
  @ApiOperation({ summary: 'Получить все feedbacks' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список feedbacks', 
    type: [Feedback], 
  })
  @Header('Cache-Control', 'max-age=60')
  findAll() {
    this.logger.log('GET /feedback');
    return this.service.findAll();
  }

  // GET /feedback/:id 
  @Get(':id')
  @ApiOperation({ summary: 'Получить feedback по ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор feedback',
    type: String,
    example: '290bb113-b43b-45db-83ba-e1e7fdf6e719',
  })
  @ApiResponse({
    status: 200,
    description: 'Feedback успешно найден',
    type: Feedback,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректный формат ID feedback',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Feedback не найден',
  })
  findOne(@Param('id') id: string) {
    this.logger.log(`GET /feedback/${id}`);
    return this.service.findOne(id);
  }

  // PUT /feedback/:id 
  @Put(':id')
  @ApiOperation({ summary: 'Обновить feedback по ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор feedback',
    type: String,
    example: '290bb113-b43b-45db-83ba-e1e7fdf6e719',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Feedback успешно обновлён', 
    type: Feedback,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректный формат ID feedback',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Feedback не найден',
  })
  update(
    @Param('id') id: string, 
    @Body() dto: UpdateFeedbackDto,
  ) {
    this.logger.log(`PUT /feedback/${id}`, dto);
    return this.service.update(id, dto);
  }

  // DELETE /feedback/:id 
  @Delete(':id') 
  @ApiOperation({ summary: 'Удалить feedback' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор feedback',
    type: String,
    example: '290bb113-b43b-45db-83ba-e1e7fdf6e719',
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Feedback успешно удалён',
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректный формат ID feedback',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Feedback не найден',
  })
  @HttpCode(204) 
  remove(@Param('id') id: string) {
    this.logger.log(`DELETE /feedback/${id}`);
    return this.service.remove(id);
  }
}