import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import DatabaseConfig from '../database.config';

@Injectable()
export class PostgresqlConfigService {
  constructor(private configService: ConfigService) {
  }

  get config(): DatabaseConfig {
    return this.configService.get<DatabaseConfig>('postgresql');
  }
}
