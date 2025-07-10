import { AccountResponseDto, CreateAccountRequestDto } from './account.dto';

export interface IAccountService {
  createAccount(
    createAccountDto: CreateAccountRequestDto,
  ): Promise<AccountResponseDto>;
}

export const IAccountService = Symbol('IAccountService');
