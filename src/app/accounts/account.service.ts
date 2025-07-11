import { Inject, Logger } from '@nestjs/common';

import { mapAccountEntityToResponseDto } from 'src/domain/mappers/account.mapper';
import { InternalError, NotFoundError } from 'src/infra/http/exceptions';
import { IAccountRepository } from 'src/infra/repositories/account/account.repository.interface';
import { EntityNotFoundError } from 'typeorm';

import { AccountResponseDto, CreateAccountRequestDto } from './account.dto';
import { IAccountService } from './account.service.interface';

export class AccountService implements IAccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) {}

  async getAccounts(): Promise<AccountResponseDto[]> {
    try {
      const accounts = await this.accountRepository.getAll();

      return accounts.map((account) => mapAccountEntityToResponseDto(account));
    } catch (error) {
      throw InternalError(this.logger, error);
    }
  }

  async getAccountById(id: number): Promise<AccountResponseDto> {
    try {
      const account = await this.accountRepository.getById(id);

      return mapAccountEntityToResponseDto(account);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw NotFoundError(this.logger, error);
      }

      throw InternalError(this.logger, error);
    }
  }

  async createAccount(
    createAccountDto: CreateAccountRequestDto,
  ): Promise<AccountResponseDto> {
    try {
      const createdAccount =
        await this.accountRepository.save(createAccountDto);

      return mapAccountEntityToResponseDto(createdAccount);
    } catch (error) {
      throw InternalError(this.logger, error);
    }
  }

  async updateAccountById(
    id: number,
    updateAccountDto: Partial<CreateAccountRequestDto>,
  ): Promise<void> {
    try {
      await this.accountRepository.updateById(id, updateAccountDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw NotFoundError(this.logger, error);
      }

      throw InternalError(this.logger, error);
    }
  }

  async deleteAccountById(id: number): Promise<void> {
    try {
      await this.accountRepository.deleteById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw NotFoundError(this.logger, error);
      }

      throw InternalError(this.logger, error);
    }
  }
}
