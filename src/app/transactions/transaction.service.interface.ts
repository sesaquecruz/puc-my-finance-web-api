import {
  CreateTransactionRequestDto,
  TransactionResponseDto,
} from './transaction.dto';

export interface ITransactionService {
  getTransactions(
    startDate: Date,
    endDate: Date,
  ): Promise<TransactionResponseDto[]>;

  getTransactionById(id: number): Promise<TransactionResponseDto>;

  createTransaction(
    createTransactionDto: CreateTransactionRequestDto,
  ): Promise<TransactionResponseDto>;
}

export const ITransactionService = Symbol('ITransactionService');
