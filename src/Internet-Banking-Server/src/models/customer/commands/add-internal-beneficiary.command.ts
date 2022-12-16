import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddInternalBeneficiaryCommand {
  constructor(
    public readonly userId: number,
    public readonly payload: AddInternalBeneficiaryRequest) {
  }
}

export class AddInternalBeneficiaryRequest {
  @ApiProperty()
  bankAccountNumber: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alias: string;

  constructor(bankAccountId: string, alias: string) {
    this.bankAccountNumber = bankAccountId;
    this.alias = alias;
  }
}