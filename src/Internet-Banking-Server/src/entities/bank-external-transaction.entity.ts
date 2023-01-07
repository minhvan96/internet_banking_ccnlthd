import {Column, Entity, ManyToOne} from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankExternalTransactionType } from './enums/bank-external-transaction-type.enum';
import { BankTransactionPaymentType } from './enums/bank-transaction-payment-type.enum';
import {BankInternalAccount} from "./bank-internal-account.entity";
import {BankExternalAccount} from "./bank-external-account.entity";


@Entity({
  name: 'bank_external_transactions',
})
export class BankExternalTransaction extends EntityBase {
  @ManyToOne(() => BankInternalAccount, bankAccount => bankAccount.transferExternal)
  internal: BankInternalAccount;

  @ManyToOne(() => BankExternalAccount, bankAccount => bankAccount.transferExternal)
  external: BankExternalAccount;

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
    name: 'transaction_payment_type',
    type: 'enum',
    enum: BankExternalTransactionType,
  })
  transactionType: BankExternalTransactionType;
  @Column({
    type: 'enum',
    enum: BankTransactionPaymentType,
    default: BankTransactionPaymentType.SENDER_PAY,
  })
  transactionPaymentType: BankTransactionPaymentType;
}