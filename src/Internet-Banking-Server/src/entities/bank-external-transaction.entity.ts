import { Column, Entity } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankExternalTransactionType } from './enums/bank-external-transaction-type.enum';
import { BankTransactionPaymentType } from './enums/bank-transaction-payment-type.enum';


@Entity({
  name: 'bank_external_transactions',
})
export class BankExternalTransaction extends EntityBase {

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