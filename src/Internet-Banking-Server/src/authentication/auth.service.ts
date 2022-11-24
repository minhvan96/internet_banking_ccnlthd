import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { JwtConstants } from '../common/constants/jwt-constants';
import { CommandBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../models/user/queries/get-user.query';
import { JwtService } from '@nestjs/jwt';
import {
  UpdateUserRefreshTokenCommand,
  UpdateUserRefreshTokenRequest,
} from '../models/user/commands/update-user-refresh-token.command';


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

  async login(dto: LoginDto) {
    // const dateNew = new Date();
    // const payload = { username: dto.username, time: dateNew.getDate() };
    const user = await this.commandBus.execute(new GetUserQuery(dto.username));
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
    // return {
    //   access_token: this.jwtService.sign(payload, {
    //     secret: jwtConstants.secret,
    //   }),
    // };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async refreshTokens(userName: string, refreshToken: string) {
    const user = await this.commandBus.execute(new GetUserQuery(userName));
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.commandBus.execute(new UpdateUserRefreshTokenCommand(
      userId,
      new UpdateUserRefreshTokenRequest(hashedRefreshToken),
    ));
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: JwtConstants.secret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: JwtConstants.secret,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
