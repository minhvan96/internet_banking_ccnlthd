import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {CreateDebtManagementCommand} from "./create-debt-management.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DebtManagement} from "../../../entities/Debt-Management.entity";

@CommandHandler(CreateDebtManagementHandler)
export class CreateDebtManagementHandler implements ICommandHandler<CreateDebtManagementCommand> {

    constructor(@InjectRepository(DebtManagement)
                private readonly debtManagementEntityRepository: Repository<DebtManagement>) {
    }

    execute(command: CreateDebtManagementCommand): Promise<any> {
        // const userExists = await this.userRepository.findOneBy({
        //         userName: command.payload.userName,
        //     },
        // );
        // if (userExists) {
        //     throw new BadRequestException('User already exists');
        // }


        // const debtManagementEntity = new DebtManagement(
        //     command.payload.debitAccountNumber,
        //     command.payload.loanAccountNumber,
        //     command.payload.amount,
        //     command.payload.description
        // );
        return Promise.resolve(undefined);
    }

}