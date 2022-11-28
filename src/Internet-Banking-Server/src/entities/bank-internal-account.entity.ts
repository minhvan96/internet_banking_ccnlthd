import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankInternalTransaction } from './bank-internal-transaction.entity';
import { User } from './identity/user.entity';

@Entity({
  name: 'bank_internal_accounts',
})
export class BankInternalAccount extends EntityBase {
  @ManyToOne(() => User, user => user.bankAccounts)
  user: User;

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
}