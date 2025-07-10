import { InjectRepository } from '@nestjs/typeorm';

import { AccountEntity } from 'src/domain/entities/account.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

import { IAccountRepository } from './account.repository.interface';

export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async getAll(): Promise<AccountEntity[]> {
    return this.accountRepository
      .createQueryBuilder()
      .orderBy('type::text', 'ASC')
      .addOrderBy('description', 'ASC')
      .getMany();
  }

  async getById(id: number): Promise<AccountEntity> {
    return this.accountRepository.findOneByOrFail({ id });
  }

  async save(account: Partial<AccountEntity>): Promise<AccountEntity> {
    return this.accountRepository.save(this.accountRepository.create(account));
  }

  async updateById(id: number, account: Partial<AccountEntity>): Promise<void> {
    const result = await this.accountRepository.update({ id }, { ...account });

    if (result.affected === 0) {
      throw new EntityNotFoundError(AccountEntity, id);
    }
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.accountRepository.delete({ id });

    if (result.affected === 0) {
      throw new EntityNotFoundError(AccountEntity, id);
    }
  }
}
