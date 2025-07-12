import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';
import { AccountResponseDto } from 'src/app/accounts/account.dto';
import { AccountModule } from 'src/app/accounts/account.module';
import { IAccountService } from 'src/app/accounts/account.service.interface';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { ErrorMessage } from 'src/infra/http/exceptions';
import { mapEntityToResponseDto } from 'src/infra/http/mappers';
import { IAccountRepository } from 'src/infra/repositories/account/account.repository.interface';
import { createAccountEntity } from 'test/repositories/generators/account.repository.generator';
import { EntityNotFoundError, Repository } from 'typeorm';

import {
  createAccountRequestDto,
  createUpdateAccountRequestDto,
} from './generators/account.service.generator';

describe('AccountService', () => {
  let accountService: IAccountService;
  let accountRepository: MockProxy<IAccountRepository>;

  beforeAll(async () => {
    accountRepository = mock<IAccountRepository>();

    const module = await Test.createTestingModule({
      imports: [AccountModule],
    })
      .overrideProvider(getRepositoryToken(AccountEntity))
      .useValue(mock<Repository<AccountEntity>>())
      .overrideProvider(IAccountRepository)
      .useValue(accountRepository)
      .compile();

    accountService = module.get<IAccountService>(IAccountService);
  });

  describe('getAccounts', () => {
    it('Should return accounts', async () => {
      const savedAccounts = [
        createAccountEntity(),
        createAccountEntity(),
        createAccountEntity(),
      ];

      const expectedResponse = savedAccounts.map((account) =>
        mapEntityToResponseDto(account, AccountResponseDto),
      );

      accountRepository.getAll.mockResolvedValueOnce(savedAccounts);

      await expect(accountService.getAccounts()).resolves.toEqual(
        expectedResponse,
      );

      expect(accountRepository.getAll).toHaveBeenCalled();
    });

    it('Should throw on internal error', async () => {
      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      accountRepository.getAll.mockRejectedValueOnce(expectedError);

      await expect(accountService.getAccounts()).rejects.toThrow(expectedError);

      expect(accountRepository.getAll).toHaveBeenCalled();
    });
  });

  describe('getAccountById', () => {
    it('Should return account by id', async () => {
      const savedAccount = createAccountEntity();

      const expectedResponse = mapEntityToResponseDto(
        savedAccount,
        AccountResponseDto,
      );

      accountRepository.getById.mockResolvedValueOnce(savedAccount);

      await expect(
        accountService.getAccountById(savedAccount.id),
      ).resolves.toEqual(expectedResponse);

      expect(accountRepository.getById).toHaveBeenCalledWith(savedAccount.id);
    });

    it('Should throw if account not exists', async () => {
      const id = faker.number.int();

      const expectedError = new NotFoundException(ErrorMessage.NOT_FOUND);

      accountRepository.getById.mockRejectedValueOnce(
        new EntityNotFoundError(AccountEntity, id),
      );

      await expect(accountService.getAccountById(id)).rejects.toThrow(
        expectedError,
      );

      expect(accountRepository.getById).toHaveBeenCalledWith(id);
    });

    it('Should throw on internal exception', async () => {
      const id = faker.number.int();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      accountRepository.getById.mockRejectedValueOnce(expectedError);

      await expect(accountService.getAccountById(id)).rejects.toThrow(
        expectedError,
      );

      expect(accountRepository.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('createAccount', () => {
    it('Should create and return account', async () => {
      const dto = createAccountRequestDto();

      const createdAccount = createAccountEntity();

      const expectedResponse = mapEntityToResponseDto(
        createdAccount,
        AccountResponseDto,
      );

      accountRepository.save.mockResolvedValueOnce(createdAccount);

      await expect(accountService.createAccount(dto)).resolves.toEqual(
        expectedResponse,
      );

      expect(accountRepository.save).toHaveBeenCalledWith(dto);
    });

    it('Should throw on internal error', async () => {
      const dto = createAccountRequestDto();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      accountRepository.save.mockRejectedValueOnce(expectedError);

      await expect(accountService.createAccount(dto)).rejects.toThrow(
        expectedError,
      );

      expect(accountRepository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateAccountById', () => {
    it('Should update account by id', async () => {
      const id = faker.number.int();

      const dto = createUpdateAccountRequestDto();

      accountRepository.updateById.mockResolvedValueOnce();

      await expect(
        accountService.updateAccountById(id, dto),
      ).resolves.toBeUndefined();

      expect(accountRepository.updateById).toHaveBeenCalledWith(id, dto);
    });

    it('Should throw if account not exists', async () => {
      const id = faker.number.int();

      const dto = createUpdateAccountRequestDto();

      const expectedError = new NotFoundException(ErrorMessage.NOT_FOUND);

      accountRepository.updateById.mockRejectedValueOnce(
        new EntityNotFoundError(AccountEntity, id),
      );

      await expect(accountService.updateAccountById(id, dto)).rejects.toThrow(
        expectedError,
      );

      expect(accountRepository.updateById).toHaveBeenCalledWith(id, dto);
    });

    it('Should throw on internal exception', async () => {
      const id = faker.number.int();

      const dto = createAccountRequestDto();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      accountRepository.updateById.mockRejectedValueOnce(expectedError);

      await expect(accountService.updateAccountById(id, dto)).rejects.toThrow(
        expectedError,
      );

      expect(accountRepository.updateById).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('deleteAccountById', () => {
    it('Should delete account by id', async () => {
      const id = faker.number.int();

      accountRepository.deleteById.mockResolvedValueOnce();

      await expect(
        accountService.deleteAccountById(id),
      ).resolves.toBeUndefined();

      expect(accountRepository.deleteById).toHaveBeenCalledWith(id);
    });

    it('Should throw if account not exists', async () => {
      const id = faker.number.int();

      const expectedError = new NotFoundException(ErrorMessage.NOT_FOUND);

      accountRepository.deleteById.mockRejectedValueOnce(
        new EntityNotFoundError(AccountEntity, id),
      );

      await expect(accountService.deleteAccountById(id)).rejects.toThrow(
        expectedError,
      );

      expect(accountRepository.deleteById).toHaveBeenCalledWith(id);
    });

    it('Should throw on internal exception', async () => {
      const id = faker.number.int();

      const expectedError = new InternalServerErrorException(
        ErrorMessage.INTERNAL_ERROR,
      );

      accountRepository.deleteById.mockRejectedValueOnce(expectedError);

      await expect(accountService.deleteAccountById(id)).rejects.toThrow(
        expectedError,
      );

      expect(accountRepository.deleteById).toHaveBeenCalledWith(id);
    });
  });
});
