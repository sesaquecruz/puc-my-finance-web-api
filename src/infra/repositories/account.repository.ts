import { InjectRepository } from '@nestjs/typeorm';

import { AccountEntity } from 'src/domain/entities/account.entity';
import { Repository } from 'typeorm';

import { IAccountRepository } from './account.repository.interface';

export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async save(account: Partial<AccountEntity>): Promise<AccountEntity> {
    return this.accountRepository.save(this.accountRepository.create(account));
  }
}
