import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresqlDatabaseProviderModule } from './providers/database/postgresql/provider.module';
import { UserModule } from './identity/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './identity/user/user.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { BankInternalAccountModule } from './models/bank-internal-account/bank-internal-account.module';
import {
  BankInternalTransactionController,
} from './models/bank-internal-transaction/bank-internal-transaction.controller';
import { BankInternalTransactionModule } from './models/bank-internal-transaction/bank-internal-transaction.module';
import { CustomerModule } from './models/customer/customer.module';
import { BankInternalAccountController } from './models/bank-internal-account/bank-internal-account.controller';
import { SeederModule } from './database/seeders/seeder.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auth/role/role.guard';


@Module({
  imports: [
    SeederModule,
    ConfigModule.forRoot(),
    CqrsModule,
    PostgresqlDatabaseProviderModule,
    UserModule,
    AuthModule,
    BankInternalAccountModule,
    BankInternalTransactionModule,
    CustomerModule,
  ],
  controllers: [AppController,
    UserController,
    AuthController,
    BankInternalAccountController,
    BankInternalTransactionController],
  providers: [AppService,
    UserModule,
    AuthModule,
    ],
})
export class AppModule {
}
