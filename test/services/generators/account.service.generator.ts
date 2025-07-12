import { faker } from '@faker-js/faker';
import {
  CreateAccountRequestDto,
  AccountResponseDto,
  UpdateAccountRequestDto,
} from 'src/app/accounts/account.dto';
import { AccountType } from 'src/domain/enums/account.type';

export function createAccountRequestDto(): CreateAccountRequestDto {
  return {
    description: faker.word.words(),
    type: faker.helpers.enumValue(AccountType),
  };
}

export function createUpdateAccountRequestDto(): UpdateAccountRequestDto {
  return {
    ...createAccountRequestDto(),
  };
}

export function createAccountResponseDto(): AccountResponseDto {
  return {
    ...createAccountRequestDto(),
    id: faker.number.int(),
  };
}
