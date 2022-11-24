import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserRefreshTokenCommand } from './update-user-refresh-token.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateUserRefreshTokenCommand)
export class UpdateUserRefreshTokenHandler implements ICommandHandler<UpdateUserRefreshTokenCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async execute(command: UpdateUserRefreshTokenCommand): Promise<any> {
    return await this.userRepository.update(command.id, command.request);
  }
}