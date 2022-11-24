import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresqlDatabaseProviderModule } from './providers/database/postgresql/provider.module';
import { UserModule } from './models/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './models/user/user.controller';
import { AuthModule } from './authentication/auth.module';
import { AuthController } from './authentication/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresqlDatabaseProviderModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserModule, AuthModule],
})
export class AppModule {}
