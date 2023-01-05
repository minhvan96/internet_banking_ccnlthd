export class RequestDebtTransactionCommand {
    constructor(public userId: number, public readonly transactionId: number) {
    }
}