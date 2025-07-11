import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionEntity } from 'src/domain/entities/transaction.entity';

import { TransactionRepository } from './transaction.repository';
import { ITransactionRepository } from './transaction.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    {
      provide: ITransactionRepository,
      useClass: TransactionRepository,
    },
  ],
  exports: [ITransactionRepository],
})
export class TransactionRepositoryModule {}
