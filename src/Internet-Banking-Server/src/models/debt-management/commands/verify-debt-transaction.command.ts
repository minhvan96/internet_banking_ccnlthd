export class VerifyDebtTransactionCommand{
    constructor(public readonly transactionId: number,
                public userId: number) {
    }
}