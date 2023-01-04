import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateDebtorCommand, debtorResponse} from "./create-debtor.command";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../entities/identity/user.entity";
import {Repository} from "typeorm";
import {DebtCustomer} from "../../../entities/debt-customer.entity";
import {BankInternalAccount} from "../../../entities/bank-internal-account.entity";

@CommandHandler(CreateDebtorCommand)
export class CreateDebtorHandler implements ICommandHandler<CreateDebtorCommand>{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(DebtCustomer)
        private readonly debtCustomerRepository: Repository<DebtCustomer>,
        @InjectRepository(BankInternalAccount)
        private readonly bankInternalAccountRepository: Repository<BankInternalAccount>
    ) {
    }

    async execute(command: CreateDebtorCommand): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                id: command.userId,
            },
            relations: {
                bankAccount: true,
                debtCustomer: true
            },
            select:{
                id: true,
                bankAccount:{
                    accountNumber: true
                }
            }
        });
        if (!user) {
            throw new NotFoundException(`User with id = ${command.userId} not found`);
        }
        if(command.payload.bankAccountNumber === user.bankAccount.accountNumber){
            throw new BadRequestException("Cannot add your bank account as a debtor");
        }


        const internalBankAccount = await this.bankInternalAccountRepository.findOneBy({
            accountNumber: command.payload.bankAccountNumber
        })

        if (!internalBankAccount) {
            throw new NotFoundException(`Internal Bank Account with account number = ${command.payload.bankAccountNumber} is not found`);
        }

        const debtor = await this.debtCustomerRepository.findOneBy({
            bankAccount: {
                accountNumber: command.payload.bankAccountNumber
            }
        });

        if(debtor){
            throw new BadRequestException("this account is exist");
        }


        const newDebtor = new DebtCustomer(command.payload.alias, internalBankAccount);
        await this.debtCustomerRepository.save(newDebtor);
        user.debtCustomer.push(newDebtor);
        await this.userRepository.save(user);
        return new debtorResponse(newDebtor.bankAccount.accountNumber, newDebtor.alias);
    }
}