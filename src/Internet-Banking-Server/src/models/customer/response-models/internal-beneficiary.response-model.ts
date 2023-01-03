export class InternalBeneficiaryResponseModel {
  alias: string;
  accountNumber: string;

  constructor(
    alias: string,
    accountNumber: string,
  ) {
    this.alias = alias;
    this.accountNumber = accountNumber;
  }
}