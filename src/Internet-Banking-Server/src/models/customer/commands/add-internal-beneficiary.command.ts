import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddInternalBeneficiaryCommand {
  constructor(public readonly userId: number,
              public readonly payload: AddInternalBeneficiaryRequest) {
  }
}

export class AddInternalBeneficiaryRequest {
  @ApiProperty()
  bankAccountId: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alias: string;

  constructor(bankAccountId: number, alias: string) {
    this.bankAccountId = bankAccountId;
    this.alias = alias;
  }
}