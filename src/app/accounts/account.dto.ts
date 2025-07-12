import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AccountType } from 'src/domain/enums/account.type';

export class CreateAccountRequestDto {
  @ApiProperty({
    description: 'Brief description of the account',
    example: 'Fuel expenses',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Type of the account, either income or expense',
    enum: AccountType,
    example: AccountType.EXPENSE,
  })
  @Expose()
  @IsEnum(AccountType)
  @IsNotEmpty()
  type: AccountType;
}

export class UpdateAccountRequestDto extends PartialType(
  CreateAccountRequestDto,
) {}

export class AccountResponseDto extends CreateAccountRequestDto {
  @ApiProperty({
    description: 'Id of the account',
    example: 123,
  })
  @Expose()
  id: number;
}
