import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankInternalAccount } from './bank-internal-account.entity';

@Entity({
  name: 'bank_internal_transactions',
})
export class BankInternalTransaction extends EntityBase {
  @ManyToOne(() => BankInternalAccount, bankAccount => bankAccount.transfers)
  @Column({
    type: 'int',
    name: 'transfer_from',
  })
  transferFrom: BankInternalAccount;

  @ManyToOne(() => BankInternalAccount, bankAccount => bankAccount.receives)
  @Column({
    type: 'int',
    name: 'transfer_to',
  })
  transferTo: BankInternalAccount;

  @Column({
    name: "transfer_amount"
  })
  transferAmount: number;

  @Column({
    name: "description"
  })
  description: string;
}
