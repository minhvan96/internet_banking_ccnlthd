import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand>{
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }
  async execute(command: RegisterUserCommand): Promise<any> {
    const userExists = await this.userRepository.findOneBy({
        userName: command.payload.userName,
      }
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
  }
}