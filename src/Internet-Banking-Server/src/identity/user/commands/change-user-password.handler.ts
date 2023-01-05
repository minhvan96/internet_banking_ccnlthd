import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ChangeUserPasswordCommand } from "./change-user-password.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../entities/identity/user.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(ChangeUserPasswordCommand)
export class ChangeUserPasswordHandler implements ICommandHandler<ChangeUserPasswordCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async execute(command: ChangeUserPasswordCommand): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: command.payload.userId
      }
    });

    if (!user) {
      throw new NotFoundException(`User with id = ${command.payload.userId} not found`);
    }

    await user.updatePassword(command.payload.newPassword);
    await this.userRepository.save(user);
  }
}