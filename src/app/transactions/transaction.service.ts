import { Inject, Logger } from '@nestjs/common';

import { mapTransactionEntityToResponseDto } from 'src/domain/mappers/transaction.mapper';
import { InternalError, NotFoundError } from 'src/infra/http/exceptions';
import { ITransactionRepository } from 'src/infra/repositories/transaction/transaction.repository.interface';
import { EntityNotFoundError } from 'typeorm';

import { TransactionResponseDto } from './transaction.dto';
import { ITransactionService } from './transaction.service.interface';

export class TransactionService implements ITransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async getTransactions(
    startDate: Date,
    endDate: Date,
  ): Promise<TransactionResponseDto[]> {
    try {
      const transactions = await this.transactionRepository.getAll(
        startDate,
        endDate,
      );

      return transactions.map((transaction) =>
        mapTransactionEntityToResponseDto(transaction),
      );
    } catch (error) {
      throw InternalError(this.logger, error);
    }
  }

  async getTransactionById(id: number): Promise<TransactionResponseDto> {
    try {
      const transaction = await this.transactionRepository.getById(id);

      return mapTransactionEntityToResponseDto(transaction);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw NotFoundError(this.logger, error);
      }

      throw InternalError(this.logger, error);
    }
  }
}
