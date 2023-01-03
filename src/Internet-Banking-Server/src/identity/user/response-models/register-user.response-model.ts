export class RegisterUserResponseModel {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly accountNumber: string
  ) {
  }
}