import { Column, Entity, ManyToOne } from "typeorm";
import { EntityBase } from "../common/entity/entity.base";
import { BankInternalAccount } from "./bank-internal-account.entity";

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
}