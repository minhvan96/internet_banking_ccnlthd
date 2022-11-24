import { Column, Entity, OneToMany } from 'typeorm';
import { EntityBase } from '../common/entity/entity.base';
import { BankAccount } from './bank-account.entity';

@Entity({
  name: 'Users',
})
export class User extends EntityBase {
  @Column({
    name: 'UserName',
  })
  username: string;

  @Column({
    name: 'Password',
  })
  password: string;

  @Column({
    name: 'FirstName',
  })
  firstName: string;

  @Column({
    name: 'LastName',
  })
  lastName: string;

  @Column({
    name: 'RefreshToken',
  })
  refreshToken: string;

  @OneToMany(() => BankAccount, bankAccount => bankAccount.user,
    {
      cascade: true,
    })
  bankAccounts: BankAccount[];
}