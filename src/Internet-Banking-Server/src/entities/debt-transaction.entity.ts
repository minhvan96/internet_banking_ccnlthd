import {EntityBase} from '../common/entity/entity.base';
import {Column, Entity, ManyToOne} from 'typeorm';
import {BankInternalAccount} from './bank-internal-account.entity';

@Entity({
  name: 'debt_transaction',
})
export class DebtTransaction extends EntityBase {

  @ManyToOne(() => BankInternalAccount, internalAccount => internalAccount.accountNumber)
  debitAccount: BankInternalAccount;

  @ManyToOne(() => BankInternalAccount, internalAccount => internalAccount.accountNumber)
  loanAccount: BankInternalAccount

  @Column({
    name: 'transfer_amount',
  })
  transferAmount: number;

  @Column({
    name: 'description',
  })
  description: string;

  @Column({
    name: 'debtCancellationContent',
    nullable: true
  })
  debtCancellationContent: string

  @Column({
    name: 'isPaid',
    default: false
  })
  isPaid: boolean;

  constructor(
      debitAccount: BankInternalAccount,
      loanAccount: BankInternalAccount,
      amount: number,
      description: string) {
    super();
    this.debitAccount = debitAccount;
    this.loanAccount = loanAccount;
    this.transferAmount = amount;
    this.description = description;
  }
}