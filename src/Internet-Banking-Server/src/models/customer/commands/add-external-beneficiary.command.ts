import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddExternalBeneficiaryCommand {
  constructor(public readonly userId: number,
              public readonly payload: AddExternalBeneficiaryRequest) {
  }
}

export class AddExternalBeneficiaryRequest {
  @ApiProperty()
  bankExternalAccountId: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alias: string;

  constructor(externalBankAccountId: number, alias: string) {
    this.bankExternalAccountId = externalBankAccountId;
    this.alias = alias;
  }
}