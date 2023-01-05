import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery, GetUserQueryResponse } from './get-user.query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async execute(query: GetUserQuery): Promise<GetUserQueryResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id: query.userId
      },
      relations: {
        roles: true,
        bankAccount: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
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
      throw new NotFoundException(`User with id = ${query.userId} not found`);

    return user;
  }
}