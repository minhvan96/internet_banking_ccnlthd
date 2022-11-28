import { Column, Entity } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankExternalTransactionType } from './enums/bank-external-transaction-type.enum';
import { BankTransactionPaymentType } from './enums/bank-transaction-payment-type.enum';


@Entity({
  name: 'BankExternalTransactions',
})
export class BankExternalTransaction extends EntityBase {

  @Column({
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