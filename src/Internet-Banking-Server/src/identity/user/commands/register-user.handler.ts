import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from '../../../authentication/auth.service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
              private readonly authService: AuthService) {
  }

  async execute(command: RegisterUserCommand): Promise<any> {
    const userExists = await this.userRepository.findOneBy({
        userName: command.payload.userName,
      },
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new User(command.payload.userName,
      command.payload.password,
      command.payload.firstName,
      command.payload.lastName);
    await this.userRepository.save(newUser);

    const tokens = await this.authService.getTokensAsync(newUser.id, newUser.userName);
    newUser.refreshToken = await this.authService.hashData(tokens.refreshToken);
    await this.userRepository.save(newUser);

  }
}