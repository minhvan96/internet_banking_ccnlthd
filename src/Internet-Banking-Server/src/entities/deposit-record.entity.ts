import { Column, Entity, ManyToOne } from "typeorm";
import { EntityBase } from "../common/entity/entity.base";
import { BankInternalAccount } from "./bank-internal-account.entity";
import { User } from "./identity/user.entity";

@Entity({
  name: "deposit_records"
})
export class DepositRecord extends EntityBase {
  @ManyToOne(() => BankInternalAccount, internalAccount => internalAccount.depositRecords)
  bankAccount: BankInternalAccount

  @Column({
    name: 'deposit_amount'
  })
  depositAmount: number;

  @ManyToOne(() => User, employee => employee.deposits)
  employee: User

  constructor(
    employee: User,
    bankAccount: BankInternalAccount,
    depositAmount: number
  ) {
    super();
    this.employee = employee;
    this.bankAccount = bankAccount;
    this.depositAmount = depositAmount;
  }
}