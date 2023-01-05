import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {messageContainer, messageObject, NotifyDebtTransactionCommand} from "./notify-debt-transaction.command";

@CommandHandler(NotifyDebtTransactionCommand)
export class NotifyDebtTransactionHandler implements  ICommandHandler<NotifyDebtTransactionCommand>{

    async execute(command: NotifyDebtTransactionCommand): Promise<messageObject[]> {
        let messageObject = []
         await messageContainer.messages.forEach(ms => {
            if(ms.userId === command.userId){
                messageObject.push(ms);
            }
        })

        if(messageObject && messageObject.length > 0){
            messageContainer.messages = messageContainer.messages.filter(value => !messageObject.includes(value))

        }
        return messageObject;
    }
}