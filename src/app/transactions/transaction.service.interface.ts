import {
  CreateTransactionRequestDto,
  TransactionQueryDto,
  TransactionResponseDto,
} from './transaction.dto';

export interface ITransactionService {
  getTransactions(
    queryDto: TransactionQueryDto,
  ): Promise<TransactionResponseDto[]>;

  getTransactionById(id: number): Promise<TransactionResponseDto>;

  createTransaction(
    createTransactionDto: CreateTransactionRequestDto,
  ): Promise<TransactionResponseDto>;

  updateTransactionById(
    id: number,
    updateTransactionDto: Partial<CreateTransactionRequestDto>,
  ): Promise<void>;

  deleteTransactionById(id: number): Promise<void>;
}

export const ITransactionService = Symbol('ITransactionService');
