import { Module } from '@nestjs/common';
import { BankInternalAccountController } from './bank-internal-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/identity/user.entity';
import { BankInternalAccount } from '../../entities/bank-internal-account.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ListBankInternalAccountHandler } from './queries/list-bank-internal-account.handler';
import { GetBankInternalAccountByIdHandler } from './queries/get-bank-internal-account-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankInternalAccount]), CqrsModule],
  controllers: [BankInternalAccountController],
  providers: [GetBankInternalAccountByIdHandler,
    ListBankInternalAccountHandler]
})
export class BankInternalAccountModule {
}
