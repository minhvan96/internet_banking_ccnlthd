import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthConstants } from '../common/constants/auth-constants';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPair } from './dto/jwt-token-pair';
import { LoginUserCommand, LoginUserRequest } from '../identity/user/commands/login-user.command';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../entities/identity/user.entity';

@Injectable()
export class AuthService {
  private readonly code;

  constructor(
    private readonly commandBus: CommandBus,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {
    this.code = Math.floor(10000 + Math.random() * 90000);
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
          secret: AuthConstants.jwt_secret,
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
          secret: AuthConstants.jwt_secret,
          expiresIn: '30d',
        },
      ),
    ]);

    return new JwtTokenPair(accessToken, refreshToken);
  }

  async sendConfirmedEmailAsync(user: User) {
    const {email, userName} = user;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Internet banking online app! Please confirm account',
      html: `User ${userName} confirmed`
    });
  }

  async sendConfirmationEmailAsync(user: User) {
    const {email, userName, authConfirmToken} = await user;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Internet banking online app! Please confirm account',
      html: `${userName} - ${authConfirmToken}`
    });
  }

  async sendOtpVerifyTransactionAsync(
    email: string,
    verification_code: number
  ){
    await this.mailerService.sendMail({
      to: email,
      subject: 'Bank transaction verification code',
      html: `${verification_code}`
    });
  }

  async sendOtpForgotPasswordAsync(
    email: string,
    forgotPasswordCode: number
  ){
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot password code',
      html: `${forgotPasswordCode}`
    });
  }
}
