import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConstants } from '../../common/constants/auth-constants';

type JwtPayload = {
  sub: number;
  username: string;
  time: Date;
  roles: string[]
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AuthConstants.jwt_secret,
    });
  }

  async validate(payload: JwtPayload) {
    return { username: payload.username, time: payload.time, sub: payload.sub, roles: payload.roles };
  }
}