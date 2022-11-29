import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/identity/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AddBankInternalAccountHandler } from './commands/add-bank-internal-account.handler';
import { CreateExternalBankTransferHandler } from './commands/create-external-bank-transfer.handler';
import { CreateInternalBankTransferHandler } from './commands/create-internal-bank-transfer.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [CustomerController],
  providers: [AddBankInternalAccountHandler,
    CreateExternalBankTransferHandler,
    CreateInternalBankTransferHandler],
})
export class CustomerModule {
}
