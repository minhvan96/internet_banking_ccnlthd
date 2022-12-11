import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetBankInternalAccountByIdQuery } from './queries/get-bank-internal-account-by-id.query';
import { ListBankInternalAccountQuery } from './queries/list-bank-internal-account.query';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Bank Internal Account")
@Controller('bank-internal-account')
export class BankInternalAccountController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @Get()
  async ListBankInternalAccount() {
    return await this.queryBus.execute(new ListBankInternalAccountQuery());
  }

  @Get('/:id')
  async GetBankInternalAccount(@Param('id') accountId: number) {
    return await this.queryBus.execute(new GetBankInternalAccountByIdQuery(accountId));
  }
}
