import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) : TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get('DATABASE_POSTGRESQL_HOST'),
        port: +configService.get('DATABASE_POSTGRESQL_PORT'),
        username: 'postgres',
        password: 'fsd@123132!DDD',
        database: 'InternetBanking',
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresqlDatabaseProviderModule {}
