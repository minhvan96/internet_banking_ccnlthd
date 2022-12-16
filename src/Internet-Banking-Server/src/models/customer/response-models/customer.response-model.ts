export class CustomerResponseModel {
  constructor(
    id: number,
    name: string,
    accountNumber: string,
    balance: number
  ) {
    this.id = id;
    this.name = name;
    this.accountNumber = accountNumber;
    this.balance = balance;

  }
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
}