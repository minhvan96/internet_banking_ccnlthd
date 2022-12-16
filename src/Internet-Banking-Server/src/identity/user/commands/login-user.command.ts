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
  @ApiProperty({
    description: 'user name',
    default: 'customer01'
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'user password',
    default: '123456@Abc'
  })
  password: string;
}
