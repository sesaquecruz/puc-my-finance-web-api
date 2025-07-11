import { Module } from '@nestjs/common';

import { TransactionRepositoryModule } from 'src/infra/repositories/transaction/transaction.repository.module';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { ITransactionService } from './transaction.service.interface';

@Module({
  imports: [TransactionRepositoryModule],
  providers: [{ provide: ITransactionService, useClass: TransactionService }],
  controllers: [TransactionController],
})
export class TransactionModule {}
