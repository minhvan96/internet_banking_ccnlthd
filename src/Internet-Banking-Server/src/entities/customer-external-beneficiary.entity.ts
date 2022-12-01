import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BankExternalAccount } from './bank-external-account.entity';
import { EntityBase } from '../common/entity/entity.base';
import { User } from './identity/user.entity';

@Entity({
  name: 'customer_external_beneficiaries',
})
export class CustomerExternalBeneficiary extends EntityBase {
  @Column({
    name: 'alias',
  })
  alias: string;

  @ManyToOne(() => User, user => user.customerExternalBeneficiaries)
  user: User;

  @OneToOne(() => BankExternalAccount)
  @JoinColumn()
  bankAccount: BankExternalAccount;
}