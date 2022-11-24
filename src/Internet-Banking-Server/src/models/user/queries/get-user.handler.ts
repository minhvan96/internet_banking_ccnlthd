import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async execute(query: GetUserQuery): Promise<User> {
    try {
      return  await this.userRepository.findOne({
        where:
          {
            username: query.username
          }
      });
    } catch (error) {
      console.log('catch');
      return null;
    }
  }
}