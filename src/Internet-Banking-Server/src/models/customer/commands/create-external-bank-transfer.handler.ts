import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExternalBankTransferCommand } from './create-external-bank-transfer.command';

@CommandHandler(CreateExternalBankTransferCommand)
export class CreateExternalBankTransferHandler implements ICommandHandler<CreateExternalBankTransferCommand> {
  execute(command: CreateExternalBankTransferCommand): Promise<any> {
    return Promise.resolve(undefined);
  }

}