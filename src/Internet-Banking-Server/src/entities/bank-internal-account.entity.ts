import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankInternalTransaction } from './bank-internal-transaction.entity';
import { User } from './identity/user.entity';

@Entity({
  name: 'bank_internal_accounts',
})
export class BankInternalAccount extends EntityBase {
  @Column({
    name: 'account_number',
  })
  accountNumber: string;

  @Column({
    name: 'balance',
  })
  balance: number;

  @OneToMany(() => BankInternalTransaction,
    (transfer) => transfer.transferFrom,
    {
      cascade: true,
    })
  transfers: BankInternalTransaction[];

  @OneToMany(() => BankInternalTransaction,
    (transfer) => transfer.transferTo,
    {
      cascade: true,
    })
  receives: BankInternalTransaction[];

  constructor(accountNumber: string) {
    super();
    this.accountNumber = accountNumber;
  }

  @BeforeInsert()
  async initializeBalance() {
    if (!this.balance)
      this.balance = 0;
  }
}