import { plainToInstance } from 'class-transformer';
import { AccountResponseDto } from 'src/app/accounts/account.dto';

import { AccountEntity } from '../entities/account.entity';

export function mapAccountEntityToResponseDto(
  account: AccountEntity,
): AccountResponseDto {
  return plainToInstance(AccountResponseDto, account, {
    excludeExtraneousValues: true,
  });
}
