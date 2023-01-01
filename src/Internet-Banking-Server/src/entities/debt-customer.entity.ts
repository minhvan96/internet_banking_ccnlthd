import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from './identity/user.entity';
import { BankInternalAccount } from './bank-internal-account.entity';
import { EntityBase } from '../common/entity/entity.base';

@Entity({
  name: 'debt_customer',
})
export class DebtCustomer extends EntityBase {
  @Column({
    name: 'alias',
  })
  alias: string;

  @ManyToOne(() => User, user => user.customerInternalBeneficiaries)
  user: User;

  @OneToOne(() => BankInternalAccount)
  @JoinColumn()
  bankAccount: BankInternalAccount;

  constructor(alias: string, bankAccount: BankInternalAccount) {
    super();
    this.alias = alias;
    this.bankAccount = bankAccount;
  }
}