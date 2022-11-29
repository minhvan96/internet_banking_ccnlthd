import { Logger, Module } from '@nestjs/common';
import { UserSeederModule } from './identity/user/user-seeder.module';
import { Seeder } from './seeder';
import { PostgresqlDatabaseProviderModule } from '../../providers/database/postgresql/provider.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    PostgresqlDatabaseProviderModule,
    UserSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {

}