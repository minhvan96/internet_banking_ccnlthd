import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {DeleteDebtTransactionCommand} from "./delete-debt-transaction.command";
import {InjectRepository} from "@nestjs/typeorm";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";
import {Repository} from "typeorm";
import {GetDebtTransactionByIdQuery} from "../queries/get-debt-transaction-by-id.query";
import {GetCustomerQuery} from "../../customer/queries/get-customer.query";
import {CustomerResponseModel} from "../../customer/response-models/customer.response-model";
import {GetCustomerByAccountNumberQuery} from "../../customer/queries/get-customer-by-account-number.query";
import {messageContainer, messageObject} from "./notify-debt-transaction.command";
import {User} from "../../../entities/identity/user.entity";

@CommandHandler(DeleteDebtTransactionCommand)
export class DeleteDebtTransactionHandler implements ICommandHandler<DeleteDebtTransactionCommand>{
    constructor(
        @InjectRepository(DebtTransaction)
        private readonly debtTransactionRepository: Repository<DebtTransaction>,
        private readonly queryBus: QueryBus,
    ) {
    }
    async execute(command: DeleteDebtTransactionCommand): Promise<boolean> {
        let debTransaction : DebtTransaction = await this.queryBus.execute(
            new GetDebtTransactionByIdQuery(command.payload.debtTransactionId));

        debTransaction.debtCancellationContent = command.payload.description;
        debTransaction.isDeleted = true;

        const result =  await this.debtTransactionRepository.save(debTransaction);

        const customer : CustomerResponseModel = await this.queryBus.execute(new GetCustomerQuery(command.payload.userId));

        let accountNotification;
        if(debTransaction.loanAccount.accountNumber === customer.accountNumber){
            accountNotification = debTransaction.debtAccount.accountNumber;
        }else{
            accountNotification = debTransaction.debtAccount.accountNumber;
        }

        let user : User = await this.queryBus.execute(new GetCustomerByAccountNumberQuery(accountNotification));
        messageContainer.messages.push(new messageObject(user.id, `Debt reminder with id: ${debTransaction.id} has been deleted`))

        return !!result;
    }

}