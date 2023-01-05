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
    nullable: true
  })
  description: string;

  @Column({
    name: 'fee'
  })
  fee: number;

  @Column({
    default: false,
    nullable: false,
    name: 'is_verified'
  })
  isVerified: boolean;

  @Column({
    nullable: true,
    name: 'verify_code'
  })
  verifyCode: number

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
    verificationCode: number,
    description?: string) {
    super();
    this.transferFrom = transferFrom;
    this.transferTo = transferTo;
    this.transferAmount = transferAmount;
    this.fee = fee;
    this.transactionPaymentType = transactionPaymentType;
    this.verifyCode = verificationCode;
    this.description = description;
  }
}
