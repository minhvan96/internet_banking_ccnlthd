import { EntityBase } from '../common/entity/entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BankInternalAccount } from './bank-internal-account.entity';

@Entity({
  name: 'debit_management',
})
export class DebtManagement extends EntityBase {

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
    name: 'debtCancellationContent'
  })
  debtCancellationContent: boolean;
}