import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUserCommand {
  constructor(public readonly payload: VerifyUserRequest) {
  }
}

export class VerifyUserRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  constructor(code: string) {
    this.code = code;
  }
}