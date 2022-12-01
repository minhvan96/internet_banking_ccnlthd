import { Logger, Module } from '@nestjs/common';
import { UserSeederModule } from './identity/user/user-seeder.module';
import { Seeder } from './seeder';
import { PostgresqlDatabaseProviderModule } from '../../providers/database/postgresql/provider.module';
import { ConfigModule } from '@nestjs/config';
import { RoleSeederModule } from './identity/role/role-seeder.module';
import { ExternalBankSeederModule } from './external-bank-seeder/external-bank-seeder.module';

@Module({
  imports: [ConfigModule.forRoot(),
    PostgresqlDatabaseProviderModule,
    UserSeederModule,
    RoleSeederModule,
    ExternalBankSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {

}