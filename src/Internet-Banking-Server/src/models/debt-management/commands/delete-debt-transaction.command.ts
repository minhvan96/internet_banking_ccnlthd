export class DeleteDebtTransactionCommand{
    constructor(public readonly payload: DeleteDebtTransactionRequest) {
    }
}

export class DeleteDebtTransactionRequest{
    debtTransactionId: number;
    description: string;

    constructor(debtTransactionId: number, description: string) {
        this.debtTransactionId = debtTransactionId;
        this.description = description;
    }
}