import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankInternalAccount } from './bank-internal-account.entity';
import { BankTransactionPaymentType } from './enums/bank-transaction-payment-type.enum';

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

  @Column({
    name: 'fee'
  })
  fee: number;

  @Column({
    type: 'enum',
    enum: BankTransactionPaymentType,
    default: BankTransactionPaymentType.SENDER_PAY,
  })
  transactionPaymentType: BankTransactionPaymentType;

  constructor(
    transferFrom: BankInternalAccount,
    transferTo: BankInternalAccount,
    transferAmount: number,
    fee: number,
    transactionPaymentType: BankTransactionPaymentType,
    description?: string) {
    super();
    this.transferFrom = transferFrom;
    this.transferTo = transferTo;
    this.transferAmount = transferAmount;
    this.fee = fee;
    this.transactionPaymentType = transactionPaymentType;
    this.description = description;
  }
}
