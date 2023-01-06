import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import {
  GetBankInternalAccountTransactionToByUserIdQuery
} from "./get-bank-internal-account-transaction-to-by-user-id.query";
import { NotFoundException } from "@nestjs/common";
import {
  GetBankInternalAccountTransactionByAccountQuery
} from "./get-bank-internal-account-transaction-by-account.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../entities/identity/user.entity";
import { Repository } from "typeorm";
import {
  GetBankInternalAccountTransactionToByAccountQuery
} from "./get-bank-internal-account-transaction-to-by-account.query";

@QueryHandler(GetBankInternalAccountTransactionToByUserIdQuery)
export class GetBankInternalAccountTransactionToByUserIdHandler implements IQueryHandler<GetBankInternalAccountTransactionToByUserIdQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly queryBus: QueryBus) {
  }

  async execute(query: GetBankInternalAccountTransactionToByUserIdQuery): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: query.userId
      },
      relations: {
        bankAccount: true
      }
    });
    if (!user) {
      throw new NotFoundException(`User with id = ${query.userId} is not found`);
    }

    return await this.queryBus.execute(new GetBankInternalAccountTransactionToByAccountQuery(user.bankAccount.accountNumber));
  }

}