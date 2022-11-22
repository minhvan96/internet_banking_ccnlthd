import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresqlConfigModule } from '../../../config/database/postgresql/config.module';
import { PostgresqlConfigService } from '../../../config/database/postgresql/config.service';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresqlConfigModule],
      useFactory: async (postgresqlConfigService: PostgresqlConfigService) => ({
        type: 'postgres' as DatabaseType,
        host: postgresqlConfigService.config.host,
        port: postgresqlConfigService.config.port,
        username: postgresqlConfigService.config.username,
        password: postgresqlConfigService.config.password,
        database: postgresqlConfigService.config.database,
        entities: [
          // ... All MySQL based schemas/entities
        ],
      }),
      inject: [PostgresqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresqlDatabaseProviderModule {}
