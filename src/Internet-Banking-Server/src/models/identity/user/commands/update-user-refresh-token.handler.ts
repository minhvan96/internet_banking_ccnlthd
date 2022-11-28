import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserRefreshTokenCommand } from './update-user-refresh-token.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateUserRefreshTokenCommand)
export class UpdateUserRefreshTokenHandler implements ICommandHandler<UpdateUserRefreshTokenCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async execute(command: UpdateUserRefreshTokenCommand): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: command.id,
    })
    if(!user)
      throw new NotFoundException(`User with id = [${command.id}] not found`);

    user.refreshToken = command.payload.refreshToken;
    await this.userRepository.save(user);

    return user;
  }
}