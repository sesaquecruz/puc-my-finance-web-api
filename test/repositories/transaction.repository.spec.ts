import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { ITransactionRepository } from 'src/infra/repositories/transaction/transaction.repository.interface';
import { TransactionRepositoryModule } from 'src/infra/repositories/transaction/transaction.repository.module';
import { EntityNotFoundError, Repository } from 'typeorm';

import { createTransactionEntity } from './generators/transaction.repository.generator';

describe('TransactionRepository', () => {
  let transactionRepository: ITransactionRepository;
  let entityRepository: MockProxy<Repository<TransactionEntity>>;

  beforeAll(async () => {
    entityRepository = mock<Repository<TransactionEntity>>();

    const module = await Test.createTestingModule({
      imports: [TransactionRepositoryModule],
    })
      .overrideProvider(getRepositoryToken(TransactionEntity))
      .useValue(entityRepository)
      .compile();

    transactionRepository = module.get<ITransactionRepository>(
      ITransactionRepository,
    );
  });

  describe('getAll', () => {
    it('Should return all transactions', async () => {
      const startDate = faker.date.past();
      const endDate = faker.date.recent();

      const expectedTransactions = [
        createTransactionEntity(),
        createTransactionEntity(),
        createTransactionEntity(),
      ];

      const queryBuilder: any = {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(expectedTransactions),
      };

      entityRepository.createQueryBuilder.mockReturnValueOnce(queryBuilder);

      await expect(
        transactionRepository.getAll(startDate, endDate),
      ).resolves.toEqual(expectedTransactions);

      expect(entityRepository.createQueryBuilder).toHaveBeenCalled();
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'date BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
      expect(queryBuilder.orderBy).toHaveBeenCalledWith('date', 'ASC');
      expect(queryBuilder.getMany).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('Should return transaction by id', async () => {
      const expectedTransaction = createTransactionEntity();

      entityRepository.findOneByOrFail.mockResolvedValueOnce(
        expectedTransaction,
      );

      await expect(
        transactionRepository.getById(expectedTransaction.id),
      ).resolves.toEqual(expectedTransaction);

      expect(entityRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: expectedTransaction.id,
      });
    });

    it('Should throw if transaction not found', async () => {
      const id = faker.number.int();

      const expectedError = new EntityNotFoundError(TransactionEntity, id);

      entityRepository.findOneByOrFail.mockRejectedValueOnce(expectedError);

      await expect(transactionRepository.getById(id)).rejects.toThrow(
        expectedError,
      );

      expect(entityRepository.findOneByOrFail).toHaveBeenCalledWith({ id });
    });
  });

  describe('save', () => {
    it('Should create and save the transaction', async () => {
      const transactionToCreate = createTransactionEntity();

      entityRepository.create.mockReturnValueOnce(transactionToCreate);
      entityRepository.save.mockResolvedValueOnce(transactionToCreate);

      await expect(
        transactionRepository.save(transactionToCreate),
      ).resolves.toEqual(transactionToCreate);

      expect(entityRepository.create).toHaveBeenCalledWith(transactionToCreate);
      expect(entityRepository.save).toHaveBeenCalledWith(transactionToCreate);
    });
  });

  describe('updateById', () => {
    it('Should update the transaction by id', async () => {
      const id = faker.number.int();

      const transactionToUpdate = createTransactionEntity();

      entityRepository.update.mockResolvedValueOnce({
        affected: 1,
        raw: [],
        generatedMaps: [],
      });

      await expect(
        transactionRepository.updateById(id, transactionToUpdate),
      ).resolves.toBeUndefined();

      expect(entityRepository.update).toHaveBeenCalledWith(
        { id },
        transactionToUpdate,
      );
    });

    it('Should throw if no rows affected', async () => {
      const id = faker.number.int();

      const transactionToUpdate = createTransactionEntity();

      entityRepository.update.mockResolvedValueOnce({
        affected: 0,
        raw: [],
        generatedMaps: [],
      });

      await expect(
        transactionRepository.updateById(id, transactionToUpdate),
      ).rejects.toThrow(new EntityNotFoundError(TransactionEntity, id));

      expect(entityRepository.update).toHaveBeenCalledWith(
        { id },
        transactionToUpdate,
      );
    });
  });

  describe('deleteById', () => {
    it('Should delete the transaction by id', async () => {
      const id = faker.number.int();

      entityRepository.delete.mockResolvedValueOnce({
        affected: 1,
        raw: [],
      });

      await expect(
        transactionRepository.deleteById(id),
      ).resolves.toBeUndefined();

      expect(entityRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('Should throw if no rows affected', async () => {
      const id = faker.number.int();

      entityRepository.delete.mockResolvedValueOnce({
        affected: 0,
        raw: [],
      });

      await expect(transactionRepository.deleteById(id)).rejects.toThrow(
        new EntityNotFoundError(TransactionEntity, id),
      );

      expect(entityRepository.delete).toHaveBeenCalledWith({ id });
    });
  });
});
