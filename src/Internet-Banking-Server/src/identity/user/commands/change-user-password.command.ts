import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangeUserPasswordCommand {
  constructor(public readonly payload: ChangeUserPasswordRequest) {
  }
}

export class ChangeCurrentUserPasswordRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  constructor(newPassword: string) {
    this.newPassword = newPassword;
  }
}

export class ChangeUserPasswordRequest extends ChangeCurrentUserPasswordRequest {
  @ApiProperty()
  userId: number;

  constructor(
    userId: number,
    newPassword: string
  ) {
    super(newPassword);
    this.newPassword = newPassword;
  }
}

