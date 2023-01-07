import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SoftDeleteUserCommand {
  constructor(public readonly payload: SoftDeleteUserRequest) {
  }
}

export class SoftDeleteUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  constructor(
    userId: number
  ) {
    this.userId = userId;
  }
}