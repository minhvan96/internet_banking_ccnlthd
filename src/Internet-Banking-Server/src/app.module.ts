import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresqlDatabaseProviderModule } from './providers/database/postgresql/provider.module';
import { UserModule } from './models/identity/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './models/identity/user/user.controller';
import { AuthModule } from './authentication/auth.module';
import { AuthController } from './authentication/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { BankInternalAccountModule } from './models/bank-internal-account/bank-internal-account.module';
import {
  BankInternalTransactionController,
} from './models/bank-internal-transaction/bank-internal-transaction.controller';
import { BankInternalTransactionModule } from './models/bank-internal-transaction/bank-internal-transaction.module';
import { BankInternalAccount1Controller } from './models/bank-internal-account1/bank-internal-account1.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    PostgresqlDatabaseProviderModule,
    UserModule,
    AuthModule,
    BankInternalAccountModule,
    BankInternalTransactionModule,

  ],
  controllers: [AppController,
    UserController,
    AuthController,
    BankInternalTransactionController,
    BankInternalAccount1Controller],
  providers: [AppService,
    UserModule,
    AuthModule],
})
export class AppModule {
}
