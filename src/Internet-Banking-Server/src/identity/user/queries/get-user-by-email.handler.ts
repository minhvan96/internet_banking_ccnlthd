import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async execute(query: GetUserByEmailQuery): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: query.email
      },
      relations: {
        roles: true,
        bankAccount: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        roles: {
          id: true,
          name: true
        },
        bankAccount: {
          accountNumber: true,
          balance: true
        }
      }
    });

    if (!user)
      throw new NotFoundException(`User with email = ${query.email} not found`);

    return user;
  }
}