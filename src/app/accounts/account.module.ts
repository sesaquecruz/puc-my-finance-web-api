import { Module } from '@nestjs/common';

import { AccountRepositoryModule } from 'src/infra/repositories/account/account.repository.module';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { IAccountService } from './account.service.interface';

@Module({
  imports: [AccountRepositoryModule],
  providers: [{ provide: IAccountService, useClass: AccountService }],
  controllers: [AccountController],
})
export class AccountModule {}
