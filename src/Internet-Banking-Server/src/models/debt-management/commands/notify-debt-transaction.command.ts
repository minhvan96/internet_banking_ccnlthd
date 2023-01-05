export class NotifyDebtTransactionCommand{
    constructor(public readonly userId: number) {
    }
}

export class messageContainer{
    static messages: messageObject[] = []

}

export class messageObject{
    constructor(
        public userId: number,
        public message: string
    ) {
    }
}