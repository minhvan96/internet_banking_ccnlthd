import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SoftDeleteUserCommand } from "./soft-delete-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../entities/identity/user.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(SoftDeleteUserCommand)
export class SoftDeleteUserHandler implements ICommandHandler<SoftDeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async execute(command: SoftDeleteUserCommand): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: command.payload.userId,
        isDeleted: false
      }
    });

    if (!user)
      throw new NotFoundException(`User with Id = ${command.payload.userId} not found or already deleted`);

    user.isDeleted = true;
    await this.userRepository.save(user);
  }
}