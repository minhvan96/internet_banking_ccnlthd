import { BankTransactionPaymentType } from '../../../entities/enums/bank-transaction-payment-type.enum';

export class BankInternalTransactionResponseModel {
  transferFromAccount: string;
  transferToAccount: string;
  transferAmount: number;
  description: string;
  fee: number
  paymentType: BankTransactionPaymentType;

  constructor(
    transferFromAccount: string,
    transferToAccount: string,
    transferAmount: number,
    description: string,
    fee: number,
    paymentType: BankTransactionPaymentType
  ) {
    this.transferFromAccount = transferFromAccount;
    this.transferToAccount = transferToAccount;
    this.transferAmount = transferAmount;
    this.description = description;
    this.fee = fee;
    this.paymentType = paymentType;
  }
}