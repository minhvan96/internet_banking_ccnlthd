import { CommandBus, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ChangeUserPasswordByCodeCommand } from "./change-user-password-by-code.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../entities/identity/user.entity";
import { Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { ChangeUserPasswordCommand, ChangeUserPasswordRequest } from "./change-user-password.command";

@CommandHandler(ChangeUserPasswordByCodeCommand)
export class ChangeUserPasswordByCodeHandler implements ICommandHandler<ChangeUserPasswordByCodeCommand>{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commandBus: CommandBus
  ) {
  }
  async execute(command: ChangeUserPasswordByCodeCommand): Promise<any> {
    const user = await this.userRepository.findOne({
      where:{
        email: command.payload.email,
        forgotPasswordCode: command.payload.code
      }
    });

    if(!user)
      throw new BadRequestException('Code is incorrect');

    await this.commandBus.execute(new ChangeUserPasswordCommand(new ChangeUserPasswordRequest(user.id, command.payload.newPassword)))
  }
}