import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresqlDatabaseProviderModule } from './providers/database/postgresql/provider.module';
import { PostgresqlConfigService } from './config/database/postgresql/config.service';
import { ModelsUserModule } from './models.user/models.user.module';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [postgresqlDatabaseConfig],
    // }),
    PostgresqlDatabaseProviderModule,
    ModelsUserModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
