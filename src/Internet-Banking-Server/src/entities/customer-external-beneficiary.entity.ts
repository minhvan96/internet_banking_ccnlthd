import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BankExternalAccount } from './bank-external-account.entity';
import { EntityBase } from '../common/entity/entity.base';

@Entity({
  name: 'customer_external_beneficiaries',
})
export class CustomerExternalBeneficiary extends EntityBase {
  @Column({
    name: 'alias',
  })
  alias: string;

  @OneToOne(() => BankExternalAccount)
  @JoinColumn()
  bankAccount: BankExternalAccount;
}