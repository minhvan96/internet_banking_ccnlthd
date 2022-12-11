import { Module } from '@nestjs/common';
import { BankInternalAccountController } from './bank-internal-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/identity/user.entity';
import { BankInternalAccount } from '../../entities/bank-internal-account.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ListInternalBankAccountHandler } from './queries/list-internal-bank-account.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankInternalAccount]), CqrsModule],
  controllers: [BankInternalAccountController],
  providers: [ListInternalBankAccountHandler]
})
export class BankInternalAccountModule {
}
