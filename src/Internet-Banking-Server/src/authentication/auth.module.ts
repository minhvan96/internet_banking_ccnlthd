import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UpdateUserRefreshTokenHandler } from '../models/user/commands/update-user-refresh-token.handler';
import { GetUserHandler } from '../models/user/queries/get-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    AuthService,
    JwtService,
    GetUserHandler,
    UpdateUserRefreshTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {
}
