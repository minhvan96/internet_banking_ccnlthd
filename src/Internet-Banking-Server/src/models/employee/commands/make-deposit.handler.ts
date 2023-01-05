import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MakeDepositCommand } from "./make-deposit.command";
import { InjectRepository } from "@nestjs/typeorm";
import { DepositRecord } from "../../../entities/deposit-record.entity";
import { Repository } from "typeorm";

@CommandHandler(MakeDepositCommand)
export class MakeDepositHandler implements ICommandHandler<MakeDepositCommand>{
  constructor(
    @InjectRepository(DepositRecord)
    private readonly depositRecordRepository: Repository<DepositRecord>
  ) {
  }
  async execute(command: MakeDepositCommand): Promise<any> {
    return;
  }

}