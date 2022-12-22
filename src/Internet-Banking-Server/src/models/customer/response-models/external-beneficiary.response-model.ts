export class ExternalBeneficiaryResponseModel {
  alias: string;
  accountNumber: string;
  externalBankId: number;
  externalBankName: string

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