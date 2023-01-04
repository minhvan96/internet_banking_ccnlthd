import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from './verify-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {
  }

  async execute(command: VerifyUserCommand): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        authConfirmToken: command.payload.code
      }
    });
    if (!user) {
      throw new UnauthorizedException('Auth code not found');
    }
    await this.userRepository.update(
      {
        email: user.email
      },
      {
        isVerified: true,
        authConfirmToken: undefined
      },
    );
    await this.authService.sendConfirmedEmailAsync(user);
    return true;
  }

}