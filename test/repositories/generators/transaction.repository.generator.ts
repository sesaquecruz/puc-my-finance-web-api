import { faker } from '@faker-js/faker';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';

export function createGetAllQuery(): {
  startDate: Date;
  endDate: Date;
} {
  return {
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
  };
}

export function createTransactionEntity(): TransactionEntity {
  return {
    id: faker.number.int(),
    history: faker.word.words(),
    date: faker.date.recent(),
    accountId: faker.number.int(),
    value: faker.number.float({ fractionDigits: 2 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    deletedAt: null,
  };
}
