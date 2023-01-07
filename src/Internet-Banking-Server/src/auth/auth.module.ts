import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UpdateUserRefreshTokenHandler } from "../identity/user/commands/update-user-refresh-token.handler";
import { GetUserHandler } from "../identity/user/queries/get-user.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/identity/user.entity";
import { LoginUserHandler } from "../identity/user/commands/login-user.handler";
import { RegisterUserHandler } from "../identity/user/commands/register-user.handler";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthConstants } from "../common/constants/auth-constants";
import { GetUserByEmailHandler } from "../identity/user/queries/get-user-by-email.handler";
import { ChangeUserPasswordHandler } from "../identity/user/commands/change-user-password.handler";
import { ChangeUserPasswordByCodeHandler } from "../identity/user/commands/change-user-password-by-code.handler";
import { ForgotUserPasswordHandler } from "../identity/user/commands/forgot-user-password.handler";
import { Role } from "../entities/identity/role.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: AuthConstants.jwt_secret,
      signOptions: { expiresIn: "60s" }
    }),
    TypeOrmModule.forFeature([
      User,
      Role]),
    CqrsModule],
  providers: [
    AuthService,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    GetUserHandler,
    UpdateUserRefreshTokenHandler,
    LoginUserHandler,
    RegisterUserHandler,
    GetUserByEmailHandler,
    ChangeUserPasswordHandler,
    ChangeUserPasswordByCodeHandler,
    ForgotUserPasswordHandler
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtService]
})
export class AuthModule {
}
