import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankTransfer } from './bank.transfer.entity';
import { User } from './user.entity';

@Entity({
  name: 'BankAccounts',
})
export class BankAccount extends EntityBase {
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

  @OneToMany(() => BankTransfer,
    (transfer) => transfer.transferFrom,
    {
      cascade: true,
    })
  transfers: BankTransfer[];

  @OneToMany(() => BankTransfer,
    (transfer) => transfer.transferTo,
    {
      cascade: true,
    })
  receives: BankTransfer[];
}