import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserRefreshTokenCommand {
  id: number;
  request: UpdateUserRefreshTokenRequest
}

export class UpdateUserRefreshTokenRequest {
  @IsString()
  @ApiProperty()
  refreshToken: string;
}