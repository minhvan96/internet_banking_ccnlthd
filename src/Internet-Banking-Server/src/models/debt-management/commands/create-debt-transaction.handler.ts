import {CommandHandler, ICommandHandler, QueryBus} from '@nestjs/cqrs';
import {CreateDebtTransactionCommand, CreateDebtTransactionResponse} from "./create-debt-transaction.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GetCustomerQuery} from "../../customer/queries/get-customer.query";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {
    GetBankInternalAccountByAccountNumberQuery
} from "../../bank-internal-account/queries/get-bank-internal-account-by-account-number.query";
import {BankInternalAccount} from "../../../entities/bank-internal-account.entity";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";

@CommandHandler(CreateDebtTransactionCommand)
export class CreateDebtTransactionHandler implements ICommandHandler<CreateDebtTransactionCommand> {

    constructor(@InjectRepository(DebtTransaction)
                private readonly debtManagementEntityRepository: Repository<DebtTransaction>,
                private readonly queryBus: QueryBus,
                @InjectRepository(BankInternalAccount)
                private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
                ) {
    }

    async execute(command: CreateDebtTransactionCommand): Promise<any> {

        if (command.payload.amount <= 0) {
            throw new BadRequestException('Amount must be greater than 0');
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

        // if (transferFromAccount.balance < command.payload.amount) {
        //     throw new BadRequestException('Source account does not have enough money to process this transfer');
        // }

        let debtTransaction :  DebtTransaction = new DebtTransaction(
            transferToAccount,
            transferFromAccount,
            command.payload.amount,
            command.payload.description
        )

        const newDebtTransaction = await this.debtManagementEntityRepository.save(debtTransaction);
        return new CreateDebtTransactionResponse(newDebtTransaction.id,
            {id: newDebtTransaction.debitAccount.id, accountNumber: newDebtTransaction.debitAccount.accountNumber},
            {id: newDebtTransaction.loanAccount.id, accountNumber: newDebtTransaction.loanAccount.accountNumber},
            newDebtTransaction.transferAmount, newDebtTransaction.description, newDebtTransaction.createdDate)
    }


}