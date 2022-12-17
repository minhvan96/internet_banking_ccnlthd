import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { JwtConstants } from '../common/constants/jwt-constants';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPair } from './dto/jwt-token-pair';
import { LoginUserCommand, LoginUserRequest } from '../identity/user/commands/login-user.command';

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    await this.commandBus.execute(new LoginUserCommand(new LoginUserRequest(username, password)));
    return null;
  }

  hashData(data: string) {
    return hash(data);
  }

  async getTokensAsync(
    userId: number,
    username: string,
    roles: string[]): Promise<JwtTokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          roles
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
          roles
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
