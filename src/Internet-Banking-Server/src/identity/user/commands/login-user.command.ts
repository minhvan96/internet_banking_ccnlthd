import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserCommand {
  constructor(public readonly payload: LoginUserRequest) {
  }
}

export class LoginUserRequest {
  constructor(userName: string, password: string) {
    this.username = userName;
    this.password = password;
  }
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
