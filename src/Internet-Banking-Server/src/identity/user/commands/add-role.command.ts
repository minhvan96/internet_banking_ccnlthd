export class AddRoleCommand {
  constructor(public readonly userId: number, public readonly roleId: number) {
  }
}