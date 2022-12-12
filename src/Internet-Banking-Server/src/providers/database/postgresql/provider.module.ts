import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../../entities/identity/user.entity';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { BankInternalTransaction } from '../../../entities/bank-internal-transaction.entity';
import { ExternalBank } from '../../../entities/external-bank.entity';
import { BankExternalAccount } from '../../../entities/bank-external-account.entity';
import { Role } from '../../../entities/identity/role.entity';
import { CustomerExternalBeneficiary } from '../../../entities/customer-external-beneficiary.entity';
import { CustomerInternalBeneficiary } from '../../../entities/customer-internal-beneficiary.entity';
import {DebtManagement} from "../../../entities/debt-management.entity";

/**
 *  Import and provide base typeorm (postgresql) related class
 *
 *  @module
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get('DATABASE_POSTGRESQL_HOST'),
        port: +configService.get('DATABASE_POSTGRESQL_PORT'),
        username: configService.get('DATABASE_POSTGRESQL_USERNAME'),
        password: configService.get('DATABASE_POSTGRESQL_PASSWORD'),
        database: configService.get('DATABASE_POSTGRESQL_NAME'),
        entities: [User,
          Role,
          BankInternalAccount,
          BankInternalTransaction,
          ExternalBank,
          BankExternalAccount,
          BankInternalTransaction,
          CustomerInternalBeneficiary,
          CustomerExternalBeneficiary,
          DebtManagement,
        ],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresqlDatabaseProviderModule {
}
