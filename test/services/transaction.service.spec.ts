import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';
import { TransactionResponseDto } from 'src/app/transactions/transaction.dto';
import { TransactionModule } from 'src/app/transactions/transaction.module';
import { ITransactionService } from 'src/app/transactions/transaction.service.interface';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { ErrorMessage } from 'src/infra/http/exceptions';
import { mapEntityToResponseDto } from 'src/infra/http/mappers';
import { ITransactionRepository } from 'src/infra/repositories/transaction/transaction.repository.interface';
import { createTransactionEntity } from 'test/repositories/generators/transaction.repository.generator';
import { EntityNotFoundError, Repository } from 'typeorm';

import {
  createTransactionQueryDto,
  createTransactionRequestDto,
  createUpdateTransactionRequestDto,
} from './generators/transaction.service.generator';

describe('TransactionService', () => {
  let transactionService: ITransactionService;
  let transactionRepository: MockProxy<ITransactionRepository>;

  beforeAll(async () => {
    transactionRepository = mock<ITransactionRepository>();

    const module = await Test.createTestingModule({
      imports: [TransactionModule],
    })
      .overrideProvider(getRepositoryToken(TransactionEntity))
      .useValue(mock<Repository<TransactionEntity>>())
      .overrideProvider(ITransactionRepository)
      .useValue(transactionRepository)
      .compile();

    transactionService = module.get<ITransactionService>(ITransactionService);
  });

  describe('getTransactions', () => {
    it('Should return transactions by period date', async () => {
      const query = createTransactionQueryDto();

      const savedTransactions = [
        createTransactionEntity(),
        createTransactionEntity(),
        createTransactionEntity(),
      ];

      const expectedResponse = savedTransactions.map((transaction) =>
        mapEntityToResponseDto(transaction, TransactionResponseDto),
      );

      transactionRepository.getAll.mockResolvedValueOnce(savedTransactions);

      await expect(transactionService.getTransactions(query)).resolves.toEqual(
        expectedResponse,
      );

      expect(transactionRepository.getAll).toHaveBeenCalledWith(query);
    });

    it('Should throw on internal error', async () => {
      const query = createTransactionQueryDto();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      transactionRepository.getAll.mockRejectedValueOnce(expectedError);

      await expect(transactionService.getTransactions(query)).rejects.toThrow(
        expectedError,
      );

      expect(transactionRepository.getAll).toHaveBeenCalledWith(query);
    });
  });

  describe('getTransactionById', () => {
    it('Should return transaction by id', async () => {
      const savedTransaction = createTransactionEntity();

      const expectedResponse = mapEntityToResponseDto(
        savedTransaction,
        TransactionResponseDto,
      );

      transactionRepository.getById.mockResolvedValueOnce(savedTransaction);

      await expect(
        transactionService.getTransactionById(savedTransaction.id),
      ).resolves.toEqual(expectedResponse);

      expect(transactionRepository.getById).toHaveBeenCalledWith(
        savedTransaction.id,
      );
    });

    it('Should throw if transaction not exists', async () => {
      const id = faker.number.int();

      const expectedError = new NotFoundException(ErrorMessage.NOT_FOUND);

      transactionRepository.getById.mockRejectedValueOnce(
        new EntityNotFoundError(TransactionEntity, id),
      );

      await expect(transactionService.getTransactionById(id)).rejects.toThrow(
        expectedError,
      );

      expect(transactionRepository.getById).toHaveBeenCalledWith(id);
    });

    it('Should throw on internal exception', async () => {
      const id = faker.number.int();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      transactionRepository.getById.mockRejectedValueOnce(expectedError);

      await expect(transactionService.getTransactionById(id)).rejects.toThrow(
        expectedError,
      );

      expect(transactionRepository.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('createTransaction', () => {
    it('Should create and return transaction', async () => {
      const dto = createTransactionRequestDto();

      const createdTransaction = createTransactionEntity();

      const expectedResponse = mapEntityToResponseDto(
        createdTransaction,
        TransactionResponseDto,
      );

      transactionRepository.save.mockResolvedValueOnce(createdTransaction);

      await expect(transactionService.createTransaction(dto)).resolves.toEqual(
        expectedResponse,
      );

      expect(transactionRepository.save).toHaveBeenCalledWith(dto);
    });

    it('Should throw on internal error', async () => {
      const dto = createTransactionRequestDto();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      transactionRepository.save.mockRejectedValueOnce(expectedError);

      await expect(transactionService.createTransaction(dto)).rejects.toThrow(
        expectedError,
      );

      expect(transactionRepository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateTransactionById', () => {
    it('Should update transaction by id', async () => {
      const id = faker.number.int();

      const dto = createUpdateTransactionRequestDto();

      transactionRepository.updateById.mockResolvedValueOnce();

      await expect(
        transactionService.updateTransactionById(id, dto),
      ).resolves.toBeUndefined();

      expect(transactionRepository.updateById).toHaveBeenCalledWith(id, dto);
    });

    it('Should throw if transaction not exists', async () => {
      const id = faker.number.int();

      const dto = createUpdateTransactionRequestDto();

      const expectedError = new NotFoundException(ErrorMessage.NOT_FOUND);

      transactionRepository.updateById.mockRejectedValueOnce(
        new EntityNotFoundError(TransactionEntity, id),
      );

      await expect(
        transactionService.updateTransactionById(id, dto),
      ).rejects.toThrow(expectedError);

      expect(transactionRepository.updateById).toHaveBeenCalledWith(id, dto);
    });

    it('Should throw on internal exception', async () => {
      const id = faker.number.int();

      const dto = createTransactionRequestDto();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      transactionRepository.updateById.mockRejectedValueOnce(expectedError);

      await expect(
        transactionService.updateTransactionById(id, dto),
      ).rejects.toThrow(expectedError);

      expect(transactionRepository.updateById).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('deleteTransactionById', () => {
    it('Should delete transaction by id', async () => {
      const id = faker.number.int();

      transactionRepository.deleteById.mockResolvedValueOnce();

      await expect(
        transactionService.deleteTransactionById(id),
      ).resolves.toBeUndefined();

      expect(transactionRepository.deleteById).toHaveBeenCalledWith(id);
    });

    it('Should throw if transaction not exists', async () => {
      const id = faker.number.int();

      const expectedError = new NotFoundException(ErrorMessage.NOT_FOUND);

      transactionRepository.deleteById.mockRejectedValueOnce(
        new EntityNotFoundError(TransactionEntity, id),
      );

      await expect(
        transactionService.deleteTransactionById(id),
      ).rejects.toThrow(expectedError);

      expect(transactionRepository.deleteById).toHaveBeenCalledWith(id);
    });

    it('Should throw on internal exception', async () => {
      const id = faker.number.int();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      transactionRepository.deleteById.mockRejectedValueOnce(expectedError);

      await expect(
        transactionService.deleteTransactionById(id),
      ).rejects.toThrow(expectedError);

      expect(transactionRepository.deleteById).toHaveBeenCalledWith(id);
    });
  });
});
