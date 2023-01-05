import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MakeDepositCommand } from "./make-deposit.command";
import { InjectRepository } from "@nestjs/typeorm";
import { DepositRecord } from "../../../entities/deposit-record.entity";
import { Repository } from "typeorm";
import { User } from "../../../entities/identity/user.entity";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(MakeDepositCommand)
export class MakeDepositHandler implements ICommandHandler<MakeDepositCommand>{
  constructor(
    @InjectRepository(DepositRecord)
    private readonly depositRecordRepository: Repository<DepositRecord>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }
  async execute(command: MakeDepositCommand): Promise<any> {
    const user = await this.userRepository.findOne({
      where:{
        id: command.payload.userId
      },
      relations:{
        bankAccount: true
      }
    });
    if(!user)
      throw new NotFoundException(`User with Id ${command.payload.userId} is not found`);

    user.bankAccount.balance += command.payload.depositAmount;
    await this.userRepository.save(user);
    return;
  }

}