import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserRefreshTokenCommand } from './update-user-refresh-token.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import * as argon2 from 'argon2';

@CommandHandler(UpdateUserRefreshTokenCommand)
export class UpdateUserRefreshTokenHandler implements ICommandHandler<UpdateUserRefreshTokenCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {
  }

  async execute(command: UpdateUserRefreshTokenCommand): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: command.userId,
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
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      command.payload.refreshToken,
    );
    if (!refreshTokenMatches)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.authService.getTokensAsync(user.id, user.userName, user.roles.map(role => role.name));
    user.refreshToken = await this.authService.hashData(tokens.refreshToken);
    await this.userRepository.save(user);

    return user;
  }
}