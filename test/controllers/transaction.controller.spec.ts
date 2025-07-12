import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';
import { TransactionModule } from 'src/app/transactions/transaction.module';
import { ITransactionService } from 'src/app/transactions/transaction.service.interface';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { GlobalValidationPipe } from 'src/infra/http/pipes';
import * as request from 'supertest';
import {
  createTransactionResponseDto,
  createTransactionRequestDto,
  createUpdateTransactionRequestDto,
  createTransactionQueryDto,
} from 'test/services/generators/transaction.service.generator';
import { Repository } from 'typeorm';

import { mapToHttpDto } from './mappers/http.mapper';

describe('TransactionController', () => {
  let app: INestApplication;
  let transactionService: MockProxy<ITransactionService>;

  beforeAll(async () => {
    transactionService = mock<ITransactionService>();

    const module = await Test.createTestingModule({
      imports: [TransactionModule],
    })
      .overrideProvider(getRepositoryToken(TransactionEntity))
      .useValue(mock<Repository<TransactionEntity>>())
      .overrideProvider(ITransactionService)
      .useValue(transactionService)
      .compile();

    app = module.createNestApplication();

    app.useGlobalPipes(GlobalValidationPipe);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /transactions', () => {
    it('Should return all transactions', async () => {
      const query = createTransactionQueryDto();

      const expectedTransactions = [
        createTransactionResponseDto(),
        createTransactionResponseDto(),
        createTransactionResponseDto(),
      ];

      transactionService.getTransactions.mockResolvedValue(
        expectedTransactions,
      );

      const response = await request(app.getHttpServer())
        .get('/transactions')
        .query(query)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(mapToHttpDto(expectedTransactions));

      expect(transactionService.getTransactions).toHaveBeenCalledWith(query);
    });
  });

  describe('GET /transactions/:id', () => {
    it('Should return transaction by id', async () => {
      const id = faker.number.int();

      const expectedTransaction = createTransactionResponseDto();

      transactionService.getTransactionById.mockResolvedValue(
        expectedTransaction,
      );

      const response = await request(app.getHttpServer())
        .get(`/transactions/${id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(mapToHttpDto(expectedTransaction));

      expect(transactionService.getTransactionById).toHaveBeenCalledWith(id);
    });
  });

  describe('POST /transactions', () => {
    it('Should create a new transaction', async () => {
      const dto = createTransactionRequestDto();

      const expectedTransaction = createTransactionResponseDto();

      transactionService.createTransaction.mockResolvedValue(
        expectedTransaction,
      );

      const response = await request(app.getHttpServer())
        .post('/transactions')
        .send(mapToHttpDto(dto))
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(mapToHttpDto(expectedTransaction));

      expect(transactionService.createTransaction).toHaveBeenCalledWith(dto);
    });
  });

  describe('PUT /transactions/:id', () => {
    it('Should update transaction by id', async () => {
      const id = faker.number.int();

      const dto = createUpdateTransactionRequestDto();

      transactionService.updateTransactionById.mockResolvedValue();

      const response = await request(app.getHttpServer())
        .put(`/transactions/${id}`)
        .send(mapToHttpDto(dto))
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});

      expect(transactionService.updateTransactionById).toHaveBeenCalledWith(
        id,
        dto,
      );
    });
  });

  describe('DELETE /transactions/:id', () => {
    it('Should delete transaction by id', async () => {
      const id = faker.number.int();

      transactionService.deleteTransactionById.mockResolvedValue();

      const response = await request(app.getHttpServer())
        .delete(`/transactions/${id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({});

      expect(transactionService.deleteTransactionById).toHaveBeenCalledWith(id);
    });
  });
});
