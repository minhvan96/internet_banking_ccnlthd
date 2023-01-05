import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserRefreshTokenCommand {
  constructor(
    public readonly userId: number,
    public readonly payload: UpdateUserRefreshTokenRequest
  ) {
  }
}

export class UpdateUserRefreshTokenRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}