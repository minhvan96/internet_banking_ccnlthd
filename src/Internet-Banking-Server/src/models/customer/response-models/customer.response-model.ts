export class CustomerResponseModel {
  constructor(
    id: number,
    name: string,
    email: string,
    accountNumber: string,
    balance: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
  id: number;
  name: string;
  email: string;
  accountNumber: string;
  balance: number;
}