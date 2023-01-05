export class GetBankInternalTransactionByIdQuery {
  constructor(
    public readonly userId: number,
    public readonly transferId: number
  ) {
  }
}