import { plainToInstance } from 'class-transformer';
import { TransactionResponseDto } from 'src/app/transactions/transaction.dto';

import { TransactionEntity } from '../entities/transaction.entity';

export function mapTransactionEntityToResponseDto(
  transaction: TransactionEntity,
): TransactionResponseDto {
  return plainToInstance(TransactionResponseDto, transaction, {
    excludeExtraneousValues: true,
  });
}
