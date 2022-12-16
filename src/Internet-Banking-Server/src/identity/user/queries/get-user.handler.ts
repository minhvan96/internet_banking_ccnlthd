import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery, GetUserQueryResponse } from './get-user.query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async execute(query: GetUserQuery): Promise<GetUserQueryResponse> {
    try {
      return await this.userRepository.findOne({
        where: {
          id: query.userId
        },
        relations: {
          roles: true
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          roles: {
            id: true,
            name: true
          }
        }
      });

    } catch (error) {
      console.log('catch');
      return null;
    }
  }
}