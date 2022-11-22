import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresqlDatabaseProviderModule } from './providers/database/postgresql/provider.module';
import { ConfigModule } from '@nestjs/config';
import postgresqlDatabaseConfig from './config/database/postgresql/configuration';
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [postgresqlDatabaseConfig],
    // }),
    PostgresqlDatabaseProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
