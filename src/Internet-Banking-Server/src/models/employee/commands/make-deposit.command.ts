import { ApiProperty } from "@nestjs/swagger";

export class MakeDepositCommand {
  constructor(public readonly payload: MakeDepositRequest) {
  }
}

export class MakeDepositRequest {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  depositAmount: number;

  constructor(
    userId: number,
    depositAmount: number
  ) {
    this.userId = userId;
    this.depositAmount = depositAmount;
  }
}
