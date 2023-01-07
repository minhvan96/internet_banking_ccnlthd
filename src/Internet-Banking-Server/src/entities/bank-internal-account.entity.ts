import {BeforeInsert, Column, Entity, OneToMany} from 'typeorm';
import {EntityBase} from '../common/entity/entity.base';
import {BankInternalTransaction} from './bank-internal-transaction.entity';
import {DebtTransaction} from "./debt-transaction.entity";
import {DepositRecord} from "./deposit-record.entity";
import {CustomerInternalBeneficiary} from "./customer-internal-beneficiary.entity";
import {BankExternalTransaction} from "./bank-external-transaction.entity";

@Entity({
  name: 'bank_internal_accounts',
})
export class BankInternalAccount extends EntityBase {
  @Column({
    name: 'account_number',
  })
  accountNumber: string;

  @Column({
    name: 'balance',
  })
  balance: number;

  @OneToMany(() => BankInternalTransaction,
    (transfer) => transfer.transferFrom,
    {
      cascade: true,
    })
  transfers: BankInternalTransaction[];

  @OneToMany(() => BankInternalTransaction,
    (transfer) => transfer.transferTo,
    {
      cascade: true,
    })
  receives: BankInternalTransaction[];

  @OneToMany(() => DebtTransaction,
      (transfer) => transfer.debtAccount,
      {
        cascade: true,
      })
  debts: DebtTransaction[];

  @OneToMany(() => DebtTransaction,
      (transfer) => transfer.loanAccount,
      {
        cascade: true,
      })
  loans: DebtTransaction[];

  @OneToMany(() => DepositRecord,
    (record) => record.bankAccount,
    {
      cascade: true,
    })
  depositRecords: DepositRecord[];

  @OneToMany(() => CustomerInternalBeneficiary,
    (account) => account.bankAccount,
    {
      cascade: true,
    })
  beneficiaries: CustomerInternalBeneficiary[];

  @OneToMany(() => BankExternalTransaction,
      (transfer) => transfer.internal,
      {
        cascade: true,
      })
  transferExternal: BankExternalTransaction[];

  constructor(
    accountNumber: string,
    id?: number) {
    super(id);
    this.accountNumber = accountNumber;
  }

  @BeforeInsert()
  async initializeBalance() {
    if (!this.balance)
      this.balance = 0;
  }
}