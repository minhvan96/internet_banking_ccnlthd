import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBankInternalAccountQuery } from './get-bank-internal-account.query';

@QueryHandler(GetBankInternalAccountQuery)
export class GetBankInternalAccountHandler implements IQueryHandler<GetBankInternalAccountQuery> {
  execute(query: GetBankInternalAccountQuery): Promise<any> {
    return Promise.resolve(undefined);
  }

}