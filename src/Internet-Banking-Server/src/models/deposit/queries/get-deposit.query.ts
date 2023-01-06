export class GetDepositQuery {
  constructor(
    public readonly employeeId: number,
    public readonly bankAccountNumber: string
  ) {
  }
}