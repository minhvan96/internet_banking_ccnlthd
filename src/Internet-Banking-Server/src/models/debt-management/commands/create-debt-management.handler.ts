import {CommandHandler, ICommandHandler, QueryBus} from '@nestjs/cqrs';
import {CreateDebtManagementCommand} from "./create-debt-management.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DebtManagement} from "../../../entities/debt-management.entity";
import {GetCustomerQuery} from "../../customer/queries/get-customer.query";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {
    GetBankInternalAccountByAccountNumberQuery
} from "../../bank-internal-account/queries/get-bank-internal-account-by-account-number.query";
import {BankInternalAccount} from "../../../entities/bank-internal-account.entity";

@CommandHandler(CreateDebtManagementHandler)
export class CreateDebtManagementHandler implements ICommandHandler<CreateDebtManagementCommand> {

    constructor(@InjectRepository(DebtManagement)
                private readonly debtManagementEntityRepository: Repository<DebtManagement>,
                private readonly queryBus: QueryBus,
                @InjectRepository(BankInternalAccount)
                private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
                ) {
    }

    async execute(command: CreateDebtManagementCommand): Promise<any> {


        if (command.payload.amount <= 0) {
            throw new BadRequestException('Transfer amount must be greater than 0');
        }

        if (command.payload.fromAccount === command.payload.loanAccount) {
            throw new BadRequestException('Source and destination account cannot be the same');
        }

        const customer = await this.queryBus.execute(new GetCustomerQuery(command.payload.userId));
        if (!customer) {
            throw new NotFoundException(`Customer with Id = ${command.payload.userId} is not found`);
        }

        const transferFromAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(customer.accountNumber));
        if (!transferFromAccount) {
            throw new NotFoundException(`Bank Account with account number = ${command.payload.fromAccount} is not found`);
        }

        const transferToAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(command.payload.loanAccount));
        if (!transferToAccount) {
            throw new NotFoundException(`Bank Account with account number = ${command.payload.loanAccount} is not found`);
        }

        if (transferFromAccount.balance < command.payload.amount) {
            throw new BadRequestException('Source account does not have enough money to process this transfer');
        }

        transferFromAccount.balance -= command.payload.amount;
        transferToAccount.balance += command.payload.amount;
        await this.bankInternalAccountRepository.save(transferFromAccount);
        await this.bankInternalAccountRepository.save(transferToAccount);

        let debtTransaction :  DebtManagement = new DebtManagement(
            transferFromAccount,
            transferToAccount,
            command.payload.amount,
            command.payload.description
        )

        await this.debtManagementEntityRepository.save(debtTransaction)
    }


}