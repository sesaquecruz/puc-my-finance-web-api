import { faker } from '@faker-js/faker';
import {
  CreateTransactionRequestDto,
  UpdateTransactionRequestDto,
  TransactionResponseDto,
} from 'src/app/transactions/transaction.dto';

export function createTransactionRequestDto(): CreateTransactionRequestDto {
  return {
    history: faker.word.words(),
    date: faker.date.recent(),
    accountId: faker.number.int(),
    value: faker.number.float(),
  };
}

export function createUpdateTransactionRequestDto(): UpdateTransactionRequestDto {
  return {
    ...createTransactionRequestDto(),
  };
}

export function createTransactionResponseDto(): TransactionResponseDto {
  return {
    ...createTransactionRequestDto(),
    id: faker.number.int(),
  };
}
