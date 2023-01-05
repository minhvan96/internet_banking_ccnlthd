import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForgotUserPasswordCommand } from "./forgot-user-password.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../entities/identity/user.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { AuthService } from "../../../auth/auth.service";

@CommandHandler(ForgotUserPasswordCommand)
export class ForgotUserPasswordHandler implements ICommandHandler<ForgotUserPasswordCommand>{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {
  }
  async execute(command: ForgotUserPasswordCommand): Promise<any> {
    const user =await this.userRepository.findOne({
      where:{
        email: command.payload.email
      }
    });
    if(!user)
      throw new NotFoundException(`User with email = ${command.payload.email} not found`);
    user.forgotPasswordCode = Math.floor(10000 + Math.random() * 90000);

    await this.authService.sendOtpForgotPasswordAsync(user.email, user.forgotPasswordCode);

    await this.userRepository.save(user);
  }

}