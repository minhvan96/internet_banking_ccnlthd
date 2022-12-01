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
        where:{
          id: query.userId
        },select:{
          id: true,
          firstName: true,
          lastName: true
        }
      })

    } catch (error) {
      console.log('catch');
      return null;
    }
  }
}