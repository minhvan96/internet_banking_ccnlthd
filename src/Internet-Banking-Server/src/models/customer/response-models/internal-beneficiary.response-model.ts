import { ApiProperty } from "@nestjs/swagger";

export class InternalBeneficiaryResponseModel {
  @ApiProperty()
  alias: string;
  @ApiProperty()
  accountNumber: string;

  constructor(
    alias: string,
    accountNumber: string
  ) {
    this.alias = alias;
    this.accountNumber = accountNumber;
  }
}