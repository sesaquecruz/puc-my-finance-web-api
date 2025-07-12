import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';
import { AccountType } from '../enums/account.type';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: AccountType })
  type: AccountType;
}
