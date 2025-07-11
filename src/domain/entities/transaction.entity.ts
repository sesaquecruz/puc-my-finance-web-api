import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @Column({ type: 'text' })
  history: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ type: 'bigint' })
  accountId: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  value: number;
}
