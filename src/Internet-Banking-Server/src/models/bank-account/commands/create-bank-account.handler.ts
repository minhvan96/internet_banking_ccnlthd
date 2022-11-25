import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBankAccountCommand } from './create-bank-account.command';

@CommandHandler(CreateBankAccountCommand)
export class CreateBankAccountHandler implements ICommandHandler<CreateBankAccountCommand>{
  execute(command: CreateBankAccountCommand): Promise<any> {
    return Promise.resolve(undefined);
  }

}