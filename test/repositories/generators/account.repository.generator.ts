import { faker } from '@faker-js/faker';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { AccountType } from 'src/domain/enums/account.type';

export function createAccountEntity(): AccountEntity {
  return {
    id: faker.number.int(),
    description: faker.word.words(),
    type: faker.helpers.enumValue(AccountType),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    deletedAt: null,
  };
}
