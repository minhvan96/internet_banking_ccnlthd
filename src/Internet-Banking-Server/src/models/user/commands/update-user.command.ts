import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserCommand {
  id: number;
  request: UpdateUserRequest
}

export class UpdateUserRequest {
  @IsString()
  @ApiProperty()
  refreshToken: string;
}