import { TransactionEntity } from 'src/domain/entities/transaction.entity';

export interface ITransactionRepository {
  getAll(startDate: Date, endDate: Date): Promise<TransactionEntity[]>;

  getById(id: number): Promise<TransactionEntity>;
}

export const ITransactionRepository = Symbol('ITransactionRepository');
