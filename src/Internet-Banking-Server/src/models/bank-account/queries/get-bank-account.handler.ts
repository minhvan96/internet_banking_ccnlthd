import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBankAccountQuery } from './get-bank-account.query';

@QueryHandler(GetBankAccountQuery)
export class GetBankAccountHandler implements IQueryHandler<GetBankAccountQuery>{
  execute(query: GetBankAccountQuery): Promise<any> {
    return Promise.resolve(undefined);
  }

}