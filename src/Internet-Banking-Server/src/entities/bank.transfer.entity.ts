import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankAccount } from './bank-account.entity';

@Entity({
  name: 'BankTransfers',
})
export class BankTransfer extends EntityBase {
  @ManyToOne(() => BankAccount, bankAccount => bankAccount.transfers)
  @Column({
    type: 'int',
    name: 'TransferFrom',
  })
  transferFrom: BankAccount;

  @ManyToOne(() => BankAccount, bankAccount => bankAccount.receives)
  @Column({
    type: 'int',
    name: 'TransferTo',
  })
  transferTo: BankAccount;
}
