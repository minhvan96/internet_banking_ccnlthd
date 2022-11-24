import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports:[TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController]
})
export class UserModule {}
