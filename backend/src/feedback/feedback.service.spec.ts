import { BadRequestException, NotFoundException } from '@nestjs/common' // Исключения Nest
import { Test, TestingModule } from '@nestjs/testing' // NestJS utilities для тестирования и создания тестового модуля
import { getRepositoryToken } from '@nestjs/typeorm' // Токен для подмены репозитория в DI
import { Repository } from 'typeorm' // Тип репозитория
import { FeedbackService } from './feedback.service' // Сервис, который тестируем
import { CreateFeedbackDto } from './dto/create-feedback.dto' // DTO для создания
import { UpdateFeedbackDto } from './dto/update-feedback.dto' // DTO для обновления
import { Feedback } from './entities/feedback.entity' // Entity Feedback

describe('FeedbackService', () => {
  // Группировка тестов для FeedbackService
  let service: FeedbackService // Экземпляр сервиса
  let repo: jest.Mocked<Repository<Feedback>> // Замоканный репозиторий с jest.fn()

  const validId = '550e8400-e29b-41d4-a716-446655440000' // Валидный UUID для тестов

  const mockFeedback: Feedback = {
    // Фейковый feedback для моков
    id: validId,
    name: 'Иван',
    email: 'i@example.com',
    message: 'Отлично!',
    createdAt: new Date(),
  }

  const mockRepo = {
    // Замоканные методы репозитория
    create: jest.fn(), // Синхронный create
    save: jest.fn(), // Асинхронный save
    find: jest.fn(), // Асинхронный find
    findOne: jest.fn(), // Асинхронный findOne
    preload: jest.fn(), // Асинхронный preload
    delete: jest.fn(), // Асинхронный delete
  }

  beforeEach(async () => {
    // Выполняется перед каждым тестом
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService, // Регистрируем сервис
        {
          provide: getRepositoryToken(Feedback), // Подменяем репозиторий на мок
          useValue: mockRepo,
        },
      ],
    }).compile()

    service = module.get(FeedbackService) // Получаем сервис из DI
    repo = module.get(getRepositoryToken(Feedback)) // Получаем мок репозитория
    jest.clearAllMocks() // Сбрасываем все вызовы mock-функций перед тестом
  })

  it('service должен быть определён', () => {
    // Проверка, что сервис создался
    expect(service).toBeDefined()
  })

  // ---------------- CREATE ----------------
  describe('create', () => {
    it('создаёт и сохраняет feedback', async () => {
      const dto: CreateFeedbackDto = {
        // DTO для создания feedback
        name: 'Иван',
        email: 'i@example.com',
        message: 'Отлично!',
      }

      repo.create.mockReturnValue(mockFeedback) // create возвращает мок
      repo.save.mockResolvedValue(mockFeedback) // save асинхронно возвращает мок

      const result = await service.create(dto) // Вызываем метод сервиса

      expect(repo.create).toHaveBeenCalledWith(dto) // Проверяем, что create вызван с dto
      expect(repo.save).toHaveBeenCalledWith(mockFeedback) // save вызван с объектом из create
      expect(result).toEqual(mockFeedback) // Метод вернул ожидаемый результат
    })
  })

  // ---------------- FIND ALL ----------------
  describe('findAll', () => {
    it('возвращает список feedbacks с сортировкой', async () => {
      repo.find.mockResolvedValue([mockFeedback]) // find возвращает массив мока

      const result = await service.findAll() // Вызываем findAll

      expect(repo.find).toHaveBeenCalledWith({
        // Проверяем правильные параметры сортировки
        order: { createdAt: 'DESC' },
      })
      expect(result).toEqual([mockFeedback]) // Метод вернул массив с feedback
    })
  })

  // ---------------- FIND ONE ----------------
  describe('findOne', () => {
    it('возвращает feedback по id', async () => {
      repo.findOne.mockResolvedValue(mockFeedback) // findOne возвращает мок

      const result = await service.findOne(validId) // Вызываем метод

      expect(repo.findOne).toHaveBeenCalledWith({
        // Проверяем параметры поиска
        where: { id: validId },
        select: ['id', 'name', 'email', 'message', 'createdAt'],
      })
      expect(result).toEqual(mockFeedback) // Результат совпадает с мок-данными
    })

    it('бросает BadRequestException при невалидном UUID', async () => {
      await expect(service.findOne('abc')).rejects.toThrow(BadRequestException) // Проверка выброса
      expect(repo.findOne).not.toHaveBeenCalled() // Репозиторий не должен был вызываться
    })

    it('бросает NotFoundException если feedback не найден', async () => {
      repo.findOne.mockResolvedValue(null) // Имитация отсутствия записи
      await expect(service.findOne(validId)).rejects.toThrow(NotFoundException) // Проверяем выброс исключения
    })
  })

  // ---------------- UPDATE ----------------
  describe('update', () => {
    it('обновляет существующий feedback', async () => {
      const dto: UpdateFeedbackDto = { name: 'Иван Петров' } // DTO обновления
      const updatedFeedback = { ...mockFeedback, ...dto } // Обновлённый объект

      repo.preload.mockResolvedValue(updatedFeedback as Feedback) // preload возвращает обновлённый объект
      repo.save.mockResolvedValue(updatedFeedback as Feedback) // save возвращает объект после сохранения

      const result = await service.update(validId, dto) // Вызываем метод

      expect(repo.preload).toHaveBeenCalledWith({ id: validId, ...dto }) // Проверяем параметры preload
      expect(repo.save).toHaveBeenCalledWith(updatedFeedback) // Проверяем параметры save
      expect(result).toEqual(updatedFeedback) // Метод вернул обновлённый объект
    })

    it('бросает BadRequestException при невалидном UUID', async () => {
      await expect(service.update('abc', { name: 'Иван' })).rejects.toThrow(
        BadRequestException,
      )

      expect(repo.preload).not.toHaveBeenCalled() // preload не вызывается
    })

    it('бросает NotFoundException если feedback не найден', async () => {
      repo.preload.mockResolvedValue(undefined) // preload вернул undefined

      await expect(service.update(validId, { name: 'Иван' })).rejects.toThrow(
        NotFoundException,
      ) // Проверка выброса
    })
  })

  // ---------------- REMOVE ----------------
  describe('remove', () => {
    it('удаляет feedback по id', async () => {
      repo.delete.mockResolvedValue({ affected: 1 } as any) // delete вернул успешное удаление

      await service.remove(validId) // Вызываем метод

      expect(repo.delete).toHaveBeenCalledWith(validId) // Проверяем параметры delete
    })

    it('бросает BadRequestException при невалидном UUID', async () => {
      await expect(service.remove('abc')).rejects.toThrow(BadRequestException) // Проверка исключения
      expect(repo.delete).not.toHaveBeenCalled() // delete не вызывается
    })

    it('бросает NotFoundException если feedback не найден', async () => {
      repo.delete.mockResolvedValue({ affected: 0 } as any) // delete ничего не удалил

      await expect(service.remove(validId)).rejects.toThrow(NotFoundException) // Проверяем выброс исключения
    })
  })
})

/*
Jest ведёт учёт всех вызовов функций, которые замоканы через jest.fn().
Каждая мок-функция хранит: сколько раз её вызвали (mock.calls.length), с какими аргументами (mock.calls),
что возвращала (mock.results).

--------------------------------------------------------------------
jest.clearAllMocks() - сбрасывает всю статистику вызовов всех моков.
--------------------------------------------------------------------

-------------------------------------------------------------------------
expect(actual).matcher(expected) - я ожидаю, что результат будет таким-то
-------------------------------------------------------------------------
# actual — реальное значение, которое вернул твой код
# matcher — метод, который проверяет это значение
# expected — ожидаемый результат

Примеры:
expect(2 + 2).toBe(4) // Проверяем строгое равенство (===)
expect([1, 2]).toEqual([1, 2]) // Проверяем глубокое равенство объектов/массивов
expect(mockFn).toHaveBeenCalledWith('arg') // Проверяем вызов функции с аргументом
expect(mockFn).not.toHaveBeenCalled() // Проверяет: эта функция не должна была вызываться

----------------------------------------------------------------------------
expect(something).toBeDefined() - проверяет, что значение не равно undefined
----------------------------------------------------------------------------

Примеры:
let a = 5
expect(a).toBeDefined() // пройдёт, потому что a = 5

let b
expect(b).toBeDefined() // упадёт, потому что b === undefined

--------------------------------------------------------------------------------------------------------------------------------------
await expect(promise).rejects.toThrow(ErrorType) - используется с промисами, чтобы проверять, что промис отклонён (rejected) с ошибкой
--------------------------------------------------------------------------------------------------------------------------------------
# promise — это асинхронный вызов, который возвращает Promise
# rejects говорит Jest: «не ждём успешного завершения, а проверяем отклонение»
# toThrow(ErrorType) — проверяем, какую ошибку выбросил промис

--------------------------------------------------------------------------------------------------------------------
repo.create.mockReturnValue(mockFeedback) - каждый раз, когда кто-то вызовет эту функцию, возвращай вот это значение
--------------------------------------------------------------------------------------------------------------------

Пример:
const mockFn = jest.fn()
mockFn.mockReturnValue(10)

console.log(mockFn()) // 10
console.log(mockFn()) // 10

-----------------------------------------------------------------------------------------------------------------------------------------------
repo.save.mockResolvedValue(mockFeedback) - каждый раз, когда эта функция вызывается, возвращай Promise, который резолвится в заданное значение
-----------------------------------------------------------------------------------------------------------------------------------------------

Пример:
const mockFn = jest.fn()
mockFn.mockResolvedValue(10) // mockFn() === Promise.resolve(10)

async function test() {
  const result = await mockFn() // result = 10
  console.log(result)
}

test()
*/
