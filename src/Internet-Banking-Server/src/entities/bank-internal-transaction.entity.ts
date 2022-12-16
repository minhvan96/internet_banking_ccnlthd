import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankInternalAccount } from './bank-internal-account.entity';

@Entity({
  name: 'bank_internal_transactions',
})
export class BankInternalTransaction extends EntityBase {
  @ManyToOne(() => BankInternalAccount, bankAccount => bankAccount.transfers)
  transferFrom: BankInternalAccount;

  @ManyToOne(() => BankInternalAccount, bankAccount => bankAccount.receives)
  transferTo: BankInternalAccount;

  @Column({
    name: 'transfer_amount',
  })
  transferAmount: number;
  @Column({
    name: 'description',
  })
  description: string;

  constructor(
    transferFrom: BankInternalAccount,
    transferTo: BankInternalAccount,
    transferAmount: number,
    description?: string) {
    super();
    this.transferFrom = transferFrom;
    this.transferTo = transferTo;
    this.transferAmount = transferAmount;
    this.description = description;
  }
}
