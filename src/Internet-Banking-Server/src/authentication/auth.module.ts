import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UpdateUserRefreshTokenHandler } from '../identity/user/commands/update-user-refresh-token.handler';
import { GetUserHandler } from '../identity/user/queries/get-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/identity/user.entity';
import { LoginUserHandler } from '../identity/user/commands/login-user.handler';
import { RegisterUserHandler } from '../identity/user/commands/register-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    AuthService,
    JwtService,
    GetUserHandler,
    UpdateUserRefreshTokenHandler,
    LoginUserHandler,
    RegisterUserHandler
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtService],
})
export class AuthModule {
}
