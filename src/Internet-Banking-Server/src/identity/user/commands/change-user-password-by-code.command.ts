import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangeUserPasswordByCodeCommand {
  constructor(public readonly payload: ChangeUserPasswordByCodeRequest) {
  }
}

export class ChangeUserPasswordByCodeRequest {
  @ApiProperty()
  code: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword;

  constructor(
    email: string,
    code: number,
    newPassword: string
  ) {
    this.email = email;
    this.newPassword = newPassword;
    this.code = code;
  }
}
