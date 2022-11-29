import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ValidateUserQuery } from './validate-user.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/identity/user.entity';

@QueryHandler(ValidateUserQuery)
export class ValidateUserHandler implements IQueryHandler<ValidateUserQuery> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  async execute(query: ValidateUserQuery): Promise<any> {
    const user = await this.userRepository.findOneBy({
      userName: query.userName,
    });
    if (user && user.password === query.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}