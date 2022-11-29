import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/identity/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserHandler } from './queries/get-user.handler';
import { UpdateUserRefreshTokenHandler } from './commands/update-user-refresh-token.handler';

@Module({
  imports:[TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController],
  providers: [GetUserHandler, UpdateUserRefreshTokenHandler],
  // exports: [CqrsModule]
})
export class UserModule {}
