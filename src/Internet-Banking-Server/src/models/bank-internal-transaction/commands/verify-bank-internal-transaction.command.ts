import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyBankInternalTransactionCommand {
  constructor(public readonly payload: VerifyBankInternalTransactionRequest) {
  }
}

export class VerifyBankInternalTransactionRequest {
  constructor(
    transferId: number,
    verificationCode: number
  ) {
    this.transferId = transferId;
    this.verificationCode = verificationCode;
  }

  @ApiProperty()
  transferId: number;

  @IsNotEmpty()
  @ApiProperty()
  verificationCode: number;
}