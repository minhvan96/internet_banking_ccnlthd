import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { roles } from '../../../database/seeders/identity/role/role-seeder.data';
import { AddBankInternalAccountCommand } from '../../../models/customer/commands/add-bank-internal-account.command';
import { RegisterUserResponseModel } from '../response-models/register-user.response-model';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService) {
  }

  async execute(command: RegisterUserCommand): Promise<RegisterUserResponseModel> {
    const userExists = await this.userRepository.findOne({
      where: {
        userName: command.payload.userName,
      },
      relations: {
        roles: true
      },
      select: {
        id: true,
        userName: true,
        password: true,
      }
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new User(command.payload.userName,
      command.payload.password,
      command.payload.email,
      command.payload.phoneNumber,
      command.payload.firstName,
      command.payload.lastName);
    await this.userRepository.save(newUser);

    const tokens = await this.authService.getTokensAsync(newUser.id, newUser.userName, roles.map(role => role.name));
    newUser.refreshToken = await this.authService.hashData(tokens.refreshToken);
    await this.userRepository.save(newUser);

    const createBankInternalAccountCommand = new AddBankInternalAccountCommand(newUser.id);
    const accountNumber = await this.commandBus.execute(createBankInternalAccountCommand);

    return new RegisterUserResponseModel(
      newUser.id,
      newUser.email,
      newUser.phoneNumber,
      accountNumber);
  }
}