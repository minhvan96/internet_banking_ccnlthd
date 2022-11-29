import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/identity/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserHandler } from './queries/get-user.handler';
import { UpdateUserRefreshTokenHandler } from './commands/update-user-refresh-token.handler';
import { AuthService } from '../../authentication/auth.service';
import { ValidateUserQuery } from './queries/validate-user.query';
import { AddRoleHandler } from './commands/add-role.handler';
import { LoginUserHandler } from './commands/login-user.handler';
import { RegisterUserHandler } from './commands/register-user.handler';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController],
  providers: [AuthService,
    JwtService,
    GetUserHandler,
    ValidateUserQuery,
    AddRoleHandler,
    LoginUserHandler,
    RegisterUserHandler,
    UpdateUserRefreshTokenHandler],
  // exports: [CqrsModule]
})
export class UserModule {
}
