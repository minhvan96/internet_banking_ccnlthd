import { BankTransactionPaymentType } from '../../../entities/enums/bank-transaction-payment-type.enum';

export class BankInternalTransactionResponseModel {
  id: number;
  transferFromAccount: string;
  transferToAccount: string;
  transferAmount: number;
  description: string;
  fee: number
  paymentType: BankTransactionPaymentType;

  constructor(
    id: number,
    transferFromAccount: string,
    transferToAccount: string,
    transferAmount: number,
    description: string,
    fee: number,
    paymentType: BankTransactionPaymentType
  ) {
    this.id = id;
    this.transferFromAccount = transferFromAccount;
    this.transferToAccount = transferToAccount;
    this.transferAmount = transferAmount;
    this.description = description;
    this.fee = fee;
    this.paymentType = paymentType;
  }
}