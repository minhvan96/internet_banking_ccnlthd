import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import postgresqlDatabaseConfig from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresqlDatabaseConfig],
      envFilePath: ['.env', '.env.development'],
    }),
  ],
})
export class PostgresqlConfigModule {}
