import { TransactionResponseDto } from './transaction.dto';

export interface ITransactionService {
  getTransactions(
    startDate: Date,
    endDate: Date,
  ): Promise<TransactionResponseDto[]>;
}

export const ITransactionService = Symbol('ITransactionService');
