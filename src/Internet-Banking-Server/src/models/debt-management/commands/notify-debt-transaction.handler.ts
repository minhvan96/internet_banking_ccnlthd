import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {messageContainer, messageObject, NotifyDebtTransactionCommand} from "./notify-debt-transaction.command";

@CommandHandler(NotifyDebtTransactionCommand)
export class NotifyDebtTransactionHandler implements  ICommandHandler<NotifyDebtTransactionCommand>{

    async execute(command: NotifyDebtTransactionCommand): Promise<messageObject[]> {
        let messageObject : messageObject[] = {...messageContainer.messages.map(ms => {
            if(ms.userId === command.userId){
                return ms;
            }
        })}

        messageContainer.messages = messageContainer.messages.filter(value => !messageObject.includes(value))

        return messageObject;
    }
}