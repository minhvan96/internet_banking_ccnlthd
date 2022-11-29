import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInternalBankTransferCommand } from './create-internal-bank-transfer.command';

@CommandHandler(CreateInternalBankTransferCommand)
export class CreateInternalBankTransferHandler implements ICommandHandler<CreateInternalBankTransferCommand> {
  execute(command: CreateInternalBankTransferCommand): Promise<any> {
    return Promise.resolve(undefined);
  }

}