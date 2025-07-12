import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';
import { AccountModule } from 'src/app/accounts/account.module';
import { IAccountService } from 'src/app/accounts/account.service.interface';
import { AccountEntity } from 'src/domain/entities/account.entity';
import * as request from 'supertest';
import {
  createAccountRequestDto,
  createAccountResponseDto,
  createUpdateAccountRequestDto,
} from 'test/services/generators/account.service.generator';
import { Repository } from 'typeorm';

import { mapToHttpDto } from './mappers/http.mapper';

describe('AccountController', () => {
  let app: INestApplication;
  let accountService: MockProxy<IAccountService>;

  beforeAll(async () => {
    accountService = mock<IAccountService>();

    const module = await Test.createTestingModule({
      imports: [AccountModule],
    })
      .overrideProvider(getRepositoryToken(AccountEntity))
      .useValue(mock<Repository<AccountEntity>>())
      .overrideProvider(IAccountService)
      .useValue(accountService)
      .compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /accounts', () => {
    it('Should return all accounts', async () => {
      const expectedAccounts = [
        createAccountResponseDto(),
        createAccountResponseDto(),
        createAccountResponseDto(),
      ];

      accountService.getAccounts.mockResolvedValue(expectedAccounts);

      const response = await request(app.getHttpServer())
        .get('/accounts')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(mapToHttpDto(expectedAccounts));

      expect(accountService.getAccounts).toHaveBeenCalled();
    });
  });

  describe('GET /accounts/:id', () => {
    it('Should return account by id', async () => {
      const id = faker.number.int();

      const expectedAccount = createAccountResponseDto();

      accountService.getAccountById.mockResolvedValue(expectedAccount);

      const response = await request(app.getHttpServer())
        .get(`/accounts/${id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(mapToHttpDto(expectedAccount));

      expect(accountService.getAccountById).toHaveBeenCalledWith(id);
    });
  });

  describe('POST /accounts', () => {
    it('Should create a new account', async () => {
      const dto = createAccountRequestDto();

      const expectedAccount = createAccountResponseDto();

      accountService.createAccount.mockResolvedValue(expectedAccount);

      const response = await request(app.getHttpServer())
        .post('/accounts')
        .send(mapToHttpDto(dto))
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(mapToHttpDto(expectedAccount));

      expect(accountService.createAccount).toHaveBeenCalledWith(dto);
    });
  });

  describe('PUT /accounts/:id', () => {
    it('Should update account by id', async () => {
      const id = faker.number.int();

      const dto = createUpdateAccountRequestDto();

      accountService.updateAccountById.mockResolvedValue();

      const response = await request(app.getHttpServer())
        .put(`/accounts/${id}`)
        .send(mapToHttpDto(dto))
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});

      expect(accountService.updateAccountById).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('DELETE /accounts/:id', () => {
    it('Should delete account by id', async () => {
      const id = faker.number.int();

      accountService.deleteAccountById.mockResolvedValue();

      const response = await request(app.getHttpServer())
        .delete(`/accounts/${id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({});

      expect(accountService.deleteAccountById).toHaveBeenCalledWith(id);
    });
  });
});
