import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresqlConfigModule } from '../../../config/database/postgresql/config.module';
import { PostgresqlConfigService } from '../../../config/database/postgresql/config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_POSTGRESQL_HOST'),
        port: +configService.get('DATABASE_POSTGRESQL_PORT'),
        username: configService.get('DATABASE_POSTGRESQL_USERNAME'),
        password: configService.get('DATABASE_POSTGRESQL_PASSWORD'),
        database: configService.get('DATABASE_POSTGRESQL_NAME'),
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresqlDatabaseProviderModule {}
