import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtConstants } from '../common/constants/jwt-constants';
import { CommandBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../identity/user/queries/get-user.query';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPair } from './dto/jwt-token-pair';

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.commandBus.execute(new GetUserQuery(username));
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async getTokensAsync(userId: number, username: string): Promise<JwtTokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: JwtConstants.secret,
          expiresIn: '60m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: JwtConstants.secret,
          expiresIn: '30d',
        },
      ),
    ]);

    return new JwtTokenPair(accessToken, refreshToken);
  }
}
