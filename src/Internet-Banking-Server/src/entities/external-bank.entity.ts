import { Entity, OneToMany } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankExternalAccount } from './bank-external-account.entity';

@Entity({
  name: 'external_banks',
})
export class ExternalBank extends EntityBase {
  name: string;

  @OneToMany(() => BankExternalAccount, externalAccount => externalAccount.externalBank,
    {
      cascade: true,
    })
  account: BankExternalAccount;
}