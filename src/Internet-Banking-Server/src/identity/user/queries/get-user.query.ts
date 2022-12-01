export class GetUserQuery {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}

export class GetUserQueryResponse {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
}