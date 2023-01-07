import { ApiProperty } from "@nestjs/swagger";

export class MakeDepositCommand {
  constructor(
    public readonly employeeId: number,
    public readonly payload: MakeDepositRequest
  ) {
  }
}

export class MakeDepositRequest {
  @ApiProperty({
    description: 'user id'
  })
  userId: number;

  @ApiProperty({
    description: 'total deposit amount (money)'
  })
  depositAmount: number;

  constructor(
    userId: number,
    depositAmount: number
  ) {
    this.userId = userId;
    this.depositAmount = depositAmount;
  }
}
