import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../entities/identity/user.entity';
import { Role } from '../entities/identity/role.entity';
import { BankInternalAccount } from '../entities/bank-internal-account.entity';
import { BankInternalTransaction } from '../entities/bank-internal-transaction.entity';
import { ExternalBank } from '../entities/external-bank.entity';
import { BankExternalAccount } from '../entities/bank-external-account.entity';

config();

const configService = new ConfigService();

export default new DataSource({
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
    BankInternalTransaction],
});