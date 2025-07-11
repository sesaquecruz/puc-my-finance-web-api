import { InjectRepository } from '@nestjs/typeorm';

import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { Repository } from 'typeorm';

import { ITransactionRepository } from './transaction.repository.interface';

export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async getAll(startDate: Date, endDate: Date): Promise<TransactionEntity[]> {
    return this.transactionRepository
      .createQueryBuilder()
      .where('date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .orderBy('date', 'ASC')
      .getMany();
  }

  async getById(id: number): Promise<TransactionEntity> {
    return this.transactionRepository.findOneByOrFail({ id });
  }

  async save(
    transaction: Partial<TransactionEntity>,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.save(
      this.transactionRepository.create(transaction),
    );
  }
}
