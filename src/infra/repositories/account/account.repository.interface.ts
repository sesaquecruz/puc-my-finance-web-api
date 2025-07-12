import { AccountEntity } from 'src/domain/entities/account.entity';

export interface IAccountRepository {
  getAll(): Promise<AccountEntity[]>;

  getById(id: number): Promise<AccountEntity>;

  save(account: Partial<AccountEntity>): Promise<AccountEntity>;

  updateById(id: number, account: Partial<AccountEntity>): Promise<void>;

  deleteById(id: number): Promise<void>;
}

export const IAccountRepository = Symbol('IAccountRepository');
