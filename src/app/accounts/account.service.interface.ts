import { AccountResponseDto, CreateAccountRequestDto } from './account.dto';

export interface IAccountService {
  getAccounts(): Promise<AccountResponseDto[]>;

  getAccountById(id: number): Promise<AccountResponseDto>;

  createAccount(
    createAccountDto: CreateAccountRequestDto,
  ): Promise<AccountResponseDto>;

  updateAccountById(
    id: number,
    updateAccountDto: Partial<CreateAccountRequestDto>,
  ): Promise<void>;
}

export const IAccountService = Symbol('IAccountService');
