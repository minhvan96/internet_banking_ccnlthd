import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankInternalAccount } from './bank-internal-account.entity';

@Entity({
  name: 'BankInternalTransactions',
})
export class BankInternalTransaction extends EntityBase {
  @ManyToOne(() => BankInternalAccount, bankAccount => bankAccount.transfers)
  @Column({
    type: 'int',
    name: 'TransferFrom',
  })
  transferFrom: BankInternalAccount;

  @ManyToOne(() => BankInternalAccount, bankAccount => bankAccount.receives)
  @Column({
    type: 'int',
    name: 'TransferTo',
  })
  transferTo: BankInternalAccount;

  @Column({
    name: "TransferAmount"
  })
  transferAmount: number;

  @Column({
    name: "Description"
  })
  description: string;
}
