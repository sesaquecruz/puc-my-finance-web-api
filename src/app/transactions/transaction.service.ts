import { Inject, Logger } from '@nestjs/common';

import { mapTransactionEntityToResponseDto } from 'src/domain/mappers/transaction.mapper';
import { InternalError, NotFoundError } from 'src/infra/http/exceptions';
import { ITransactionRepository } from 'src/infra/repositories/transaction/transaction.repository.interface';
import { EntityNotFoundError } from 'typeorm';

import {
  CreateTransactionRequestDto,
  TransactionQueryDto,
  TransactionResponseDto,
} from './transaction.dto';
import { ITransactionService } from './transaction.service.interface';

export class TransactionService implements ITransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async getTransactions(
    queryDto: TransactionQueryDto,
  ): Promise<TransactionResponseDto[]> {
    try {
      const transactions = await this.transactionRepository.getAll(queryDto);

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

  async createTransaction(
    createTransactionDto: CreateTransactionRequestDto,
  ): Promise<TransactionResponseDto> {
    try {
      const createdTransaction =
        await this.transactionRepository.save(createTransactionDto);

      return mapTransactionEntityToResponseDto(createdTransaction);
    } catch (error) {
      throw InternalError(this.logger, error);
    }
  }

  async updateTransactionById(
    id: number,
    updateTransactionDto: Partial<CreateTransactionRequestDto>,
  ): Promise<void> {
    try {
      await this.transactionRepository.updateById(id, updateTransactionDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw NotFoundError(this.logger, error);
      }

      throw InternalError(this.logger, error);
    }
  }

  async deleteTransactionById(id: number): Promise<void> {
    try {
      await this.transactionRepository.deleteById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw NotFoundError(this.logger, error);
      }

      throw InternalError(this.logger, error);
    }
  }
}
