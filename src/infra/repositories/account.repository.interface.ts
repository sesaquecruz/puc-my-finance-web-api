import { AccountEntity } from 'src/domain/entities/account.entity';

export interface IAccountRepository {
  getAll(): Promise<AccountEntity[]>;

  getById(id: number): Promise<AccountEntity>;

  save(account: Partial<AccountEntity>): Promise<AccountEntity>;
}

export const IAccountRepository = Symbol('IAccountRepository');
