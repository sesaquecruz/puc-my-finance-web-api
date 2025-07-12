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

  updateTransactionById(
    id: number,
    updateTransactionDto: Partial<CreateTransactionRequestDto>,
  ): Promise<void>;
}

export const ITransactionService = Symbol('ITransactionService');
