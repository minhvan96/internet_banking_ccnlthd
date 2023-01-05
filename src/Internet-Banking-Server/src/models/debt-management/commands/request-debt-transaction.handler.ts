import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {RequestDebtTransactionCommand} from "./request-debt-transaction.command";
import {InjectRepository} from "@nestjs/typeorm";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";
import {Repository} from "typeorm";
import {MailerService} from "@nestjs-modules/mailer";
import {GetCustomerQuery} from "../../customer/queries/get-customer.query";
import {NotFoundException} from "@nestjs/common";
import {GetDebtTransactionByIdQuery} from "../queries/get-debt-transaction-by-id.query";

@CommandHandler(RequestDebtTransactionCommand)
export class RequestDebtTransactionHandler implements ICommandHandler<RequestDebtTransactionCommand>{
    private readonly code: number;
    constructor(
        @InjectRepository(DebtTransaction)
        private readonly debtTransactionRepository: Repository<DebtTransaction>,
        private readonly queryBus: QueryBus,
        private mailerService: MailerService,
    ) {
        this.code = Math.floor(10000 + Math.random() * 90000);
    }

    async execute(command: RequestDebtTransactionCommand): Promise<any> {
        const customer = await this.queryBus.execute(new GetCustomerQuery(command.userId));
        if (!customer) {
            throw new NotFoundException(`Customer with Id = ${command.userId} is not found`);
        }

        await this.mailerService.sendMail({
            to: customer.email,
            subject: 'Debt payment confirmation',
            html: `<p>Your Debt Payment Confirmation Code is: ${this.code}</p>`
        });
        const debtTransaction = await this.queryBus.execute(
            new GetDebtTransactionByIdQuery(command.transactionId))
        // debtTransaction.isPaid = true;
        debtTransaction.code = this.code;

        return await this.debtTransactionRepository.save(debtTransaction);
    }
}