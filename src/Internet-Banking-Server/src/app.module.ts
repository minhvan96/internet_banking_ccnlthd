import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PostgresqlDatabaseProviderModule} from './providers/database/postgresql/provider.module';
import {UserModule} from './identity/user/user.module';
import {ConfigModule} from '@nestjs/config';
import {UserController} from './identity/user/user.controller';
import {AuthModule} from './auth/auth.module';
import {AuthController} from './auth/auth.controller';
import {CqrsModule} from '@nestjs/cqrs';
import {BankInternalAccountModule} from './models/bank-internal-account/bank-internal-account.module';
import {
  BankInternalTransactionController,
} from './models/bank-internal-transaction/bank-internal-transaction.controller';
import {BankInternalTransactionModule} from './models/bank-internal-transaction/bank-internal-transaction.module';
import {CustomerModule} from './models/customer/customer.module';
import {BankInternalAccountController} from './models/bank-internal-account/bank-internal-account.controller';
import {SeederModule} from './database/seeders/seeder.module';
import {DebtManagementModule} from "./models/debt-management/debt-management.module";
import {DebtManagementController} from "./models/debt-management/debt-management.controller";
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DepositModule } from "./models/deposit/deposit.module";
import { DepositController } from "./models/deposit/deposit.controller";
import {AdministrationModule} from "./models/admin/administration.module";
import {AdministrationController} from "./models/admin/administration.controller";


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
    DebtManagementModule,
    DepositModule,
    AdministrationModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: false,
        auth: {
          user: 'van.testmmtnc@gmail.com',
          pass: 'tjjaxgavscwmxgjc',
        },
      },
      defaults: {
        from: '"No Reply" <van.testmmtnc@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'views/email-templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController,
    UserController,
    AuthController,
    BankInternalAccountController,
    BankInternalTransactionController,
    DepositController,
    DebtManagementController,
    AdministrationController],
  providers: [AppService,
    UserModule,
    AuthModule,
    ],
})
export class AppModule {
}
