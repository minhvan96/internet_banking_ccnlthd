import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankInternalTransactionCommand {
  constructor(public readonly payload: CreateBankInternalTransactionRequest) {
  }
}

export class CreateBankInternalTransactionFromCurrentUserRequest {


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
    description: string) {
    this.toAccount = toAccount;
    this.transferAmount = transferAmount;
    this.description = description;
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
    description?: string,
    fromAccount?: string,
  ) {
    super(toAccount, amount, description);
    this.userId = userId;
    this.fromAccount = fromAccount;
  }
}

