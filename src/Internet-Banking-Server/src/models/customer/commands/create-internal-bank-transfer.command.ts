import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInternalBankTransferCommand {
  constructor(public readonly userId: string, public readonly payload: CreateInternalBankTransferRequest) {
  }
}

export class CreateInternalBankTransferRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  internalAccountNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  receiverAccountNumber: string;

  @ApiProperty()
  amount: number;

  @IsString()
  @ApiProperty()
  description: string;
}