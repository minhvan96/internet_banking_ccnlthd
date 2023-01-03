import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../../entities/identity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './user-seeder.data';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
  }

  create(): Array<Promise<User>> {
    return users.map(async (user: User) => {
      return await this.userRepository
        .findOneBy({
          userName: user.userName,
        })
        .then(async newUser => {
          // We check if a user already exists.
          // If it does don't create a new one.
          if (newUser) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(user).then(() => { ... });
            await this.userRepository.save(user),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}