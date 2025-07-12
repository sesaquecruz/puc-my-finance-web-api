import { TransactionEntity } from 'src/domain/entities/transaction.entity';

export interface ITransactionRepository {
  getAll(startDate: Date, endDate: Date): Promise<TransactionEntity[]>;

  getById(id: number): Promise<TransactionEntity>;

  save(transaction: Partial<TransactionEntity>): Promise<TransactionEntity>;

  updateById(
    id: number,
    transaction: Partial<TransactionEntity>,
  ): Promise<void>;

  deleteById(id: number): Promise<void>;
}

export const ITransactionRepository = Symbol('ITransactionRepository');
