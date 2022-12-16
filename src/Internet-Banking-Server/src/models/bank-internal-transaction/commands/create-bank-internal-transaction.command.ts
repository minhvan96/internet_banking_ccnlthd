export class CreateBankInternalTransactionCommand {
  constructor(public readonly payload: CreateBankInternalTransactionRequest) {
  }
}

export class CreateBankInternalTransactionFromCurrentUserRequest {
  to: number;
  amount: number;
  description: string;

  constructor(
    to: number,
    amount: number,
    description: string) {
    this.to = to;
    this.amount = amount;
    this.description = description;
  }
}

export class CreateBankInternalTransactionRequest extends CreateBankInternalTransactionFromCurrentUserRequest {
  from: number;
  constructor(
    from: number,
    to: number,
    amount: number,
    description: string
  ) {
    super(to, amount, description);
    this.from = from;
  }
}

