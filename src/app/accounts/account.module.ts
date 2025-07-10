import { Module } from '@nestjs/common';

import { LegacyAddressRepositoryModule } from 'src/infra/repositories/account.repository.module';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { IAccountService } from './account.service.interface';

@Module({
  imports: [LegacyAddressRepositoryModule],
  providers: [{ provide: IAccountService, useClass: AccountService }],
  controllers: [AccountController],
})
export class AccountModule {}
