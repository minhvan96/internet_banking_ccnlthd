import { ApiProperty } from "@nestjs/swagger";

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

  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  accountNumber: string;
  @ApiProperty()
  balance: number;
}