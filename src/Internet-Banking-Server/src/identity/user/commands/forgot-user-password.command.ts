import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class ForgotUserPasswordCommand {
  constructor(public readonly payload: ForgotUserPasswordRequest) {
  }
}

export class ForgotUserPasswordRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmpty()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}