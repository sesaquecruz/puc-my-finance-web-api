import { AccountEntity } from 'src/domain/entities/account.entity';

export interface IAccountRepository {
  save(account: Partial<AccountEntity>): Promise<AccountEntity>;
}

export const IAccountRepository = Symbol('IAccountRepository');
