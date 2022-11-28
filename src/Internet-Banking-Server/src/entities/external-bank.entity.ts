import { Column, Entity, OneToMany } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankExternalAccount } from './bank-external-account.entity';

@Entity({
  name: 'ExternalBanks',
})
export class ExternalBank extends EntityBase {
  @Column({
    name: 'Name',
  })
  name: string;

  @OneToMany(() => BankExternalAccount, externalAccount => externalAccount.externalBank,
    {
      cascade: true,
    })
  account: BankExternalAccount;
}