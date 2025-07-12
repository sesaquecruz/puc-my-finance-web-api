import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountEntity } from 'src/domain/entities/account.entity';

import { AccountRepository } from './account.repository';
import { IAccountRepository } from './account.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
  ],
  exports: [IAccountRepository],
})
export class AccountRepositoryModule {}
