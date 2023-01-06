export class DepositRecordResponseModel {
  constructor(
    public readonly employeeId: number,
    public readonly employeeName: string,
    public readonly bankAccount: string,
    public readonly depositAmount: number
  ) {
  }
}