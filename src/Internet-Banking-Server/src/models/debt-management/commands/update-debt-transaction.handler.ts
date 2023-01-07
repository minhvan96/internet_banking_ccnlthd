import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {UpdateDebtTransactionCommand, UpdateDebtTransactionResponse} from "./update-debt-transaction.command";
import {InjectRepository} from "@nestjs/typeorm";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";
import {Repository} from "typeorm";
import {GetDebtTransactionByIdQuery} from "../queries/get-debt-transaction-by-id.query";
import {BadRequestException} from "@nestjs/common";
import {
    GetBankInternalAccountByAccountNumberQuery
} from "../../bank-internal-account/queries/get-bank-internal-account-by-account-number.query";
import {BankInternalAccount} from "../../../entities/bank-internal-account.entity";
import {GetCustomerByAccountNumberQuery} from "../../customer/queries/get-customer-by-account-number.query";
import {messageContainer, messageObject} from "./notify-debt-transaction.command";
import {User} from "../../../entities/identity/user.entity";

@CommandHandler(UpdateDebtTransactionCommand)
export class UpdateDebtTransactionHandler implements ICommandHandler<UpdateDebtTransactionCommand>{
    private readonly code: number;

    constructor(
        @InjectRepository(DebtTransaction)
        private readonly debtTransactionRepository: Repository<DebtTransaction>,
        @InjectRepository(BankInternalAccount)
        private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
        private readonly queryBus: QueryBus,

    ) {
        this.code = Math.floor(10000 + Math.random() * 90000);
    }
    async execute(command: UpdateDebtTransactionCommand): Promise<any> {

        const debtTransaction: DebtTransaction = await this.queryBus.execute(
            new GetDebtTransactionByIdQuery(command.payload.transactionId))
        if(debtTransaction.code !== command.payload.code){
            throw new BadRequestException('Incorrect code ');
        }
        const accountNumberDebt =  debtTransaction.debtAccount.accountNumber;
        const accountNumberLoan =  debtTransaction.loanAccount.accountNumber;
        const transferFromAccount = await this.queryBus.execute(
            new GetBankInternalAccountByAccountNumberQuery(accountNumberDebt));

        const transferToAccount = await this.queryBus.execute(
            new GetBankInternalAccountByAccountNumberQuery(accountNumberLoan));

        if (transferFromAccount.balance < debtTransaction.transferAmount) {
            throw new BadRequestException('Source account does not have enough money to process this transfer');
        }

        transferFromAccount.balance -= debtTransaction.transferAmount;
        transferToAccount.balance += debtTransaction.transferAmount;
        await this.bankInternalAccountRepository.save(transferFromAccount);
        await this.bankInternalAccountRepository.save(transferToAccount);

        debtTransaction.isPaid = true;
        const debtTransactionUpdate = await this.debtTransactionRepository.save(debtTransaction);

        let user: User = await this.queryBus.execute(new GetCustomerByAccountNumberQuery(accountNumberLoan));
        messageContainer.messages.push(new messageObject(user.id, `Debit reminder with id: ${debtTransactionUpdate.id} paid`))


        return new UpdateDebtTransactionResponse(debtTransactionUpdate.id, transferFromAccount.balance, debtTransactionUpdate.debtAccount.accountNumber)
    }

}