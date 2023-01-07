import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { ExternalBank } from './external-bank.entity';
import { EntityBase } from '../common/entity/entity.base';
import {BankExternalTransaction} from "./bank-external-transaction.entity";

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


  @OneToMany(() => BankExternalTransaction,
      (transfer) => transfer.external,
      {
        cascade: true,
      })
  transferExternal: BankExternalTransaction[];
}