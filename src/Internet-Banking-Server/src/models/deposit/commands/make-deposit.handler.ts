import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MakeDepositCommand } from "./make-deposit.command";
import { InjectRepository } from "@nestjs/typeorm";
import { DepositRecord } from "../../../entities/deposit-record.entity";
import { Repository } from "typeorm";
import { User } from "../../../entities/identity/user.entity";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { RoleConstants } from "../../../common/constants/role-constants";

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
    const employee = await this.userRepository.findOne({
      where:{
        id: command.employeeId
      },
      relations:{
        roles: true
      }
    })
    if(!employee)
      throw new NotFoundException(`Employee with id = ${command.employeeId}} not found`);
    if(!employee.roles.find(x=>x.name === RoleConstants.Employee))
      throw new ForbiddenException(`Require employee role`);

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


    const newDepositRecord = new DepositRecord(
      employee,
      user.bankAccount,
      command.payload.depositAmount
    );
    await this.depositRecordRepository.save(newDepositRecord);
    return;
  }

}