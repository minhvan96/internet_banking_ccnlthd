import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetBankInternalTransactionByIdQuery } from "./get-bank-internal-transaction-by-id.query";
import { BankInternalTransactionResponseModel } from "../response-models/bank-internal-transaction.response-model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BankInternalAccount } from "../../../entities/bank-internal-account.entity";
import { BankInternalTransaction } from "../../../entities/bank-internal-transaction.entity";
import { User } from "../../../entities/identity/user.entity";
import { NotFoundException } from "@nestjs/common";
import { CustomerInternalBeneficiary } from "../../../entities/customer-internal-beneficiary.entity";

@QueryHandler(GetBankInternalTransactionByIdQuery)
export class GetBankInternalTransactionByIdHandler implements IQueryHandler<GetBankInternalTransactionByIdQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
    @InjectRepository(BankInternalTransaction)
    private readonly bankInternalTransactionRepository: Repository<BankInternalTransaction>,
    @InjectRepository(CustomerInternalBeneficiary)
    private readonly customerInternalBeneficiaryRepository: Repository<CustomerInternalBeneficiary>
  ) {
  }

  async execute(query: GetBankInternalTransactionByIdQuery): Promise<BankInternalTransactionResponseModel> {
    const user = await this.userRepository.findOne({
      where: {
        id: query.userId
      },
      relations: {
        bankAccount: true
      }
    });
    if (!user)
      throw new NotFoundException(`User with Id = ${query.userId} not found`);

    const bankInternalTransaction = await this.bankInternalTransactionRepository.findOne({
      where: {
        id: query.transferId,
        transferFrom: {
          accountNumber: user.bankAccount.accountNumber
        },
        isDeleted: false
      },
      relations: {
        transferFrom: true,
        transferTo: true
      }
    });

    if(!bankInternalTransaction)
      throw new NotFoundException(`Bank transfer with id = ${query.transferId} for account ${user.bankAccount.accountNumber} not found`);

    const beneficiary = await this.customerInternalBeneficiaryRepository.findOne({
      where:{
        user:{
          id: query.userId
        },
        bankAccount:{
          accountNumber: bankInternalTransaction.transferTo.accountNumber
        }
      }
    })
    let alias = '';
    if(beneficiary){
      alias = beneficiary.alias;
    }

    return new BankInternalTransactionResponseModel(
      bankInternalTransaction.id,
      bankInternalTransaction.transferFrom.accountNumber,
      bankInternalTransaction.transferTo.accountNumber,
      bankInternalTransaction.transferAmount,
      bankInternalTransaction.description,
      bankInternalTransaction.fee,
      bankInternalTransaction.transactionPaymentType,
      alias
    );
  }
}