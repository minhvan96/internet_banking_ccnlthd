import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { User } from "./identity/user.entity";
import { BankInternalAccount } from "./bank-internal-account.entity";
import { EntityBase } from "../common/entity/entity.base";

@Entity({
  name: "customer_internal_beneficiaries"
})
export class CustomerInternalBeneficiary extends EntityBase {
  @Column({
    name: "alias"
  })
  alias: string;

  @ManyToOne(() => User, user => user.customerInternalBeneficiaries)
  user: User;

  @ManyToOne(() => BankInternalAccount, account => account.beneficiaries)
  bankAccount: BankInternalAccount;

  constructor(
    alias: string,
    bankAccount: BankInternalAccount,
    user: User,
    id?: number) {
    super(id);
    this.alias = alias;
    this.bankAccount = bankAccount;
    this.user = user;
  }
}