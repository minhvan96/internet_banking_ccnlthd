import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresqlDatabaseProviderModule } from './providers/database/postgresql/provider.module';
import { UserModule } from './models/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './models/user/user.controller';
import { AuthModule } from './authentication/auth.module';
import { AuthController } from './authentication/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { BankTransferController } from './models/bank-transfer/bank-transfer/bank-transfer.controller';
import { BankTransferController } from './models/bank-transfer/bank-transfer.controller';
import { BankTransferModule } from './models/bank-transfer/bank-transfer.module';
import { BankAccountModule } from './models/bank-account/bank-account.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    PostgresqlDatabaseProviderModule,
    UserModule,
    AuthModule,
    BankTransferModule,
    BankAccountModule,
  ],
  controllers: [AppController, UserController, AuthController, BankTransferController],
  providers: [AppService, UserModule, AuthModule],
})
export class AppModule {
}
