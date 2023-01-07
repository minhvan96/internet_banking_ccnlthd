import { ApiProperty } from "@nestjs/swagger";

export class ExternalBeneficiaryResponseModel {
  @ApiProperty()
  alias: string;
  @ApiProperty()
  accountNumber: string;
  @ApiProperty()
  externalBankId: number;
  @ApiProperty()
  externalBankName: string;

  constructor(
    alias: string,
    accountNumber: string,
    externalBankId: number,
    externalBankName: string
  ) {
    this.alias = alias;
    this.accountNumber = accountNumber;
    this.externalBankId = externalBankId;
    this.externalBankName = externalBankName;
  }
}