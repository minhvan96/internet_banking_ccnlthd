import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankInternalTransaction } from './bank-internal-transaction.entity';
import { User } from './user.entity';

@Entity({
  name: 'BankInternalAccounts',
})
export class BankInternalAccount extends EntityBase {
  @ManyToOne(() => User, user => user.bankAccounts)
  user: User;

  @Column({
    name: 'AccountNumber',
  })
  accountNumber: string;

  @Column({
    name: 'Balance',
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