import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExternalBankTransferCommand {
  constructor(public readonly userId: string, public readonly payload: CreateExternalBankTransferRequest) {
  }
}

export class CreateExternalBankTransferRequest {
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