import { Inject, Logger } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { InternalError } from 'src/infra/http/exceptions';
import { IAccountRepository } from 'src/infra/repositories/account.repository.interface';

import { AccountResponseDto, CreateAccountRequestDto } from './account.dto';
import { IAccountService } from './account.service.interface';

export class AccountService implements IAccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) {}

  async createAccount(
    createAccountDto: CreateAccountRequestDto,
  ): Promise<AccountResponseDto> {
    try {
      const createdAccount =
        await this.accountRepository.save(createAccountDto);

      return this.mapAccountEntityToResponseDto(createdAccount);
    } catch (error) {
      throw InternalError(this.logger, error);
    }
  }

  private mapAccountEntityToResponseDto(
    account: AccountEntity,
  ): AccountResponseDto {
    return plainToInstance(AccountResponseDto, account, {
      excludeExtraneousValues: true,
    });
  }
}
