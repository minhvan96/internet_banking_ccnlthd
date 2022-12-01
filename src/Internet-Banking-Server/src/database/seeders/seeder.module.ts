import { Logger, Module } from '@nestjs/common';
import { UserSeederModule } from './identity/user/user-seeder.module';
import { Seeder } from './seeder';
import { PostgresqlDatabaseProviderModule } from '../../providers/database/postgresql/provider.module';
import { ConfigModule } from '@nestjs/config';
import { RoleSeederModule } from './identity/role/role-seeder.module';

@Module({
  imports: [ConfigModule.forRoot(),
    PostgresqlDatabaseProviderModule,
    UserSeederModule,
    RoleSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {

}