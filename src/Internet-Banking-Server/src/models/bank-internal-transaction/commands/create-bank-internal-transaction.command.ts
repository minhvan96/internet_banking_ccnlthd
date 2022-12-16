import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankInternalTransactionCommand {
  constructor(public readonly payload: CreateBankInternalTransactionRequest) {
  }
}

export class CreateBankInternalTransactionFromCurrentUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  to: number;

  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsString()
  @ApiProperty()
  description: string;

  constructor(
    to: number,
    amount: number,
    description: string) {
    this.to = to;
    this.amount = amount;
    this.description = description;
  }
}

export class CreateBankInternalTransactionRequest extends CreateBankInternalTransactionFromCurrentUserRequest {
  @IsNotEmpty()
  @ApiProperty()
  from: number;
  constructor(
    from: number,
    to: number,
    amount: number,
    description: string
  ) {
    super(to, amount, description);
    this.from = from;
  }
}

