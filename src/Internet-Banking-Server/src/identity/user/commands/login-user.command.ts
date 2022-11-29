export class LoginUserCommand {
  constructor(public readonly payload: LoginUserRequest) {
  }
}

export class LoginUserRequest {
  username: string;
  password: string;
}
