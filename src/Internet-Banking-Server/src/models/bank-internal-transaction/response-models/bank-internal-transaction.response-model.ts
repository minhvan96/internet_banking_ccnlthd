import { BankTransactionPaymentType } from '../../../entities/enums/bank-transaction-payment-type.enum';

export class BankInternalTransactionResponseModel {
  id: number;
  transferFromAccount: string;
  transferToAccount: string;
  transferToName: string;
  transferToBeneficiary: string;
  transferAmount: number;
  description: string;
  fee: number
  paymentType: BankTransactionPaymentType;
  transferDate: Date

  constructor(
    id: number,
    transferFromAccount: string,
    transferToAccount: string,
    transferAmount: number,
    description: string,
    fee: number,
    paymentType: BankTransactionPaymentType,
    transferDate: Date,
    transferToName?: string,
    alias?: string
  ) {
    this.id = id;
    this.transferFromAccount = transferFromAccount;
    this.transferToAccount = transferToAccount;
    this.transferToName = transferToName;
    this.transferAmount = transferAmount;
    this.description = description;
    this.fee = fee;
    this.paymentType = paymentType;
    this.transferDate = transferDate;
    this.transferToBeneficiary = alias;
  }
}