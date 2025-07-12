import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsDateString,
  IsInt,
  IsDate,
} from 'class-validator';

export class TransactionQueryDto {
  @ApiProperty({
    description: 'Start date for the transaction filter',
    example: '2022-12-01T00:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'End date for the transaction filter',
    example: '2023-01-31T23:59:59.999Z',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}

export class CreateTransactionRequestDto {
  @ApiProperty({
    description: 'Description of the transaction',
    example: 'Fuel for trip',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  history: string;

  @ApiProperty({
    description: 'Date and time of the transaction',
    example: '2023-07-10T14:00:00-03:00',
  })
  @Expose()
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Id of the associated account',
    example: 1,
  })
  @Expose()
  @IsInt()
  @IsPositive()
  accountId: number;

  @ApiProperty({
    description: 'Value of the transaction',
    example: 289.75,
  })
  @Expose()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  value: number;
}

export class UpdateTransactionRequestDto extends PartialType(
  CreateTransactionRequestDto,
) {}

export class TransactionResponseDto extends CreateTransactionRequestDto {
  @ApiProperty({
    description: 'Id of the transaction',
    example: 100,
  })
  @Expose()
  id: number;
}
