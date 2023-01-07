import { BankTransactionPaymentType } from "../../../entities/enums/bank-transaction-payment-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class BankInternalTransactionResponseModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  transferFromAccount: string;

  @ApiProperty()
  transferToAccount: string;

  @ApiProperty()
  transferToName: string;

  @ApiProperty()
  transferToBeneficiary: string;

  @ApiProperty()
  transferAmount: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  fee: number;

  @ApiProperty()
  paymentType: BankTransactionPaymentType;

  @ApiProperty()
  transferDate: Date;

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