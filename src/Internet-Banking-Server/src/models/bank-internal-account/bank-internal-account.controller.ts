import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetBankInternalAccountByIdQuery } from './queries/get-bank-internal-account-by-id.query';
import { ListBankInternalAccountQuery } from './queries/list-bank-internal-account.query';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';

@ApiTags('Bank Internal Account')
@Controller('bank-internal-account')
export class BankInternalAccountController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @ApiOperation({ summary: "Get list of bank internal accounts" })
  @UseGuards(AccessTokenGuard)
  @Get()
  async ListBankInternalAccount() {
    return await this.queryBus.execute(new ListBankInternalAccountQuery());
  }

  @ApiOperation({ summary: "Get bank internal account by id" })
  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async GetBankInternalAccount(@Param('id') accountId: number) {
    return await this.queryBus.execute(new GetBankInternalAccountByIdQuery(accountId));
  }
}
