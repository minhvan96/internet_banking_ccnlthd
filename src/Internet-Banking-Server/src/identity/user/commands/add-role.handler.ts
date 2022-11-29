import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddRoleCommand } from './add-role.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';

@CommandHandler(AddRoleCommand)
export class AddRoleHandler implements ICommandHandler<AddRoleCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  execute(command: AddRoleCommand): Promise<any> {
    return Promise.resolve(undefined);
  }
}