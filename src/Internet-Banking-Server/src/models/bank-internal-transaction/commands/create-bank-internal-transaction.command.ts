import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BankTransactionPaymentType } from '../../../entities/enums/bank-transaction-payment-type.enum';

export class CreateBankInternalTransactionCommand {
  constructor(public readonly payload: CreateBankInternalTransactionRequest) {
  }
}

export class CreateBankInternalTransactionFromCurrentUserRequest {
  @ApiProperty({
    default: BankTransactionPaymentType.SENDER_PAY
  })
  transactionPaymentType: BankTransactionPaymentType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toAccount: string;

  @IsNotEmpty()
  @ApiProperty()
  transferAmount: number;

  @IsString()
  @ApiProperty()
  description: string;

  constructor(
    toAccount: string,
    transferAmount: number,
    description: string,
    transactionPaymentType: BankTransactionPaymentType) {
    this.toAccount = toAccount;
    this.transferAmount = transferAmount;
    this.description = description;
    this.transactionPaymentType = transactionPaymentType;
  }
}

export class CreateBankInternalTransactionRequest extends CreateBankInternalTransactionFromCurrentUserRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fromAccount: string;

  @IsNotEmpty()
  userId: number;

  constructor(
    userId: number,
    toAccount: string,
    amount: number,
    transactionPaymentType: BankTransactionPaymentType,
    description?: string,
    fromAccount?: string,
  ) {
    super(toAccount, amount, description, transactionPaymentType);
    this.userId = userId;
    this.fromAccount = fromAccount;
  }
}

