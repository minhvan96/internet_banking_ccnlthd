import { Column, Entity, ManyToOne } from 'typeorm';
import { ExternalBank } from './external-bank.entity';
import { EntityBase } from '../common/entity/entity.base';

@Entity({
  name: 'bank_external_accounts',
})
export class BankExternalAccount extends EntityBase {
  @Column({
    name: 'account_number',
  })
  accountNumber: string;

  @ManyToOne(() => ExternalBank, externalBank => externalBank.account)
  externalBank: ExternalBank;
}