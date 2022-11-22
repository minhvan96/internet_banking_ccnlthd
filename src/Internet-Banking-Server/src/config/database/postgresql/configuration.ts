import { registerAs } from '@nestjs/config';

export default registerAs('postgresql', () => ({
  host: process.env.DATABASE_POSTGRESQL_HOST,
  port: parseInt(process.env.DATABASE_POSTGRESQL_PORT, 10) || 5432,
  username: process.env.DATABASE_POSTGRESQL_USERNAME,
  password: process.env.DATABASE_POSTGRESQL_PASSWORD,
  name: process.env.DATABASE_POSTGRESQL_NAME,
}));
