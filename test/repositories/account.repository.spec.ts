import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { IAccountRepository } from 'src/infra/repositories/account/account.repository.interface';
import { AccountRepositoryModule } from 'src/infra/repositories/account/account.repository.module';
import { EntityNotFoundError, Repository } from 'typeorm';

import { createAccountEntity } from './generators/account.repository.generator';

describe('AccountRepository', () => {
  let accountRepository: IAccountRepository;
  let entityRepository: MockProxy<Repository<AccountEntity>>;

  beforeAll(async () => {
    entityRepository = mock<Repository<AccountEntity>>();

    const module = await Test.createTestingModule({
      imports: [AccountRepositoryModule],
    })
      .overrideProvider(getRepositoryToken(AccountEntity))
      .useValue(entityRepository)
      .compile();

    accountRepository = module.get<IAccountRepository>(IAccountRepository);
  });

  describe('getAll', () => {
    it('Should return all accounts', async () => {
      const expectedAccounts = [
        createAccountEntity(),
        createAccountEntity(),
        createAccountEntity(),
      ];

      const queryBuilder: any = {
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(expectedAccounts),
      };

      entityRepository.createQueryBuilder.mockReturnValueOnce(queryBuilder);

      await expect(accountRepository.getAll()).resolves.toEqual(
        expectedAccounts,
      );

      expect(entityRepository.createQueryBuilder).toHaveBeenCalled();
      expect(queryBuilder.orderBy).toHaveBeenCalledWith('type::text', 'ASC');
      expect(queryBuilder.addOrderBy).toHaveBeenCalledWith(
        'description',
        'ASC',
      );
      expect(queryBuilder.getMany).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('Should return account by id', async () => {
      const expectedAccount = createAccountEntity();

      entityRepository.findOneByOrFail.mockResolvedValueOnce(expectedAccount);

      await expect(
        accountRepository.getById(expectedAccount.id),
      ).resolves.toEqual(expectedAccount);

      expect(entityRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: expectedAccount.id,
      });
    });

    it('Should throw if account not found', async () => {
      const id = faker.number.int();

      const expectedError = new EntityNotFoundError(AccountEntity, id);

      entityRepository.findOneByOrFail.mockRejectedValueOnce(expectedError);

      await expect(accountRepository.getById(id)).rejects.toThrow(
        expectedError,
      );

      expect(entityRepository.findOneByOrFail).toHaveBeenCalledWith({ id });
    });
  });

  describe('save', () => {
    it('Should create and save the account', async () => {
      const accountToCreate = createAccountEntity();

      entityRepository.create.mockReturnValueOnce(accountToCreate);
      entityRepository.save.mockResolvedValueOnce(accountToCreate);

      await expect(accountRepository.save(accountToCreate)).resolves.toEqual(
        accountToCreate,
      );

      expect(entityRepository.create).toHaveBeenCalledWith(accountToCreate);
      expect(entityRepository.save).toHaveBeenCalledWith(accountToCreate);
    });
  });

  describe('updateById', () => {
    it('Should update the account by id', async () => {
      const id = faker.number.int();

      const accountToUpdate = createAccountEntity();

      entityRepository.update.mockResolvedValueOnce({
        affected: 1,
        raw: [],
        generatedMaps: [],
      });

      await expect(
        accountRepository.updateById(id, accountToUpdate),
      ).resolves.toBeUndefined();

      expect(entityRepository.update).toHaveBeenCalledWith(
        { id },
        accountToUpdate,
      );
    });

    it('Should throw if no rows affected', async () => {
      const id = faker.number.int();

      const accountToUpdate = createAccountEntity();

      entityRepository.update.mockResolvedValueOnce({
        affected: 0,
        raw: [],
        generatedMaps: [],
      });

      await expect(
        accountRepository.updateById(id, accountToUpdate),
      ).rejects.toThrow(new EntityNotFoundError(AccountEntity, id));

      expect(entityRepository.update).toHaveBeenCalledWith(
        { id },
        accountToUpdate,
      );
    });
  });

  describe('deleteById', () => {
    it('Should delete the account by id', async () => {
      const id = faker.number.int();

      entityRepository.delete.mockResolvedValueOnce({
        affected: 1,
        raw: [],
      });

      await expect(accountRepository.deleteById(id)).resolves.toBeUndefined();

      expect(entityRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('Should throw if no rows affected', async () => {
      const id = faker.number.int();

      entityRepository.delete.mockResolvedValueOnce({
        affected: 0,
        raw: [],
      });

      await expect(accountRepository.deleteById(id)).rejects.toThrow(
        new EntityNotFoundError(AccountEntity, id),
      );

      expect(entityRepository.delete).toHaveBeenCalledWith({ id });
    });
  });
});
