import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './login-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/identity/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/authentication/auth.service';
import { JwtTokenPair } from 'src/authentication/dto/jwt-token-pair';
import { BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService) {
  }

  async execute(command: LoginUserCommand): Promise<JwtTokenPair> {
    const user = await this.userRepository.findOneBy({
      userName: command.payload.username,
    });

    if (!user)
      throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, command.payload.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.authService.getTokensAsync(user.id, user.userName);
    user.refreshToken = await this.authService.hashData(tokens.refreshToken);
    await this.userRepository.save(user);
    return tokens;
  }
}