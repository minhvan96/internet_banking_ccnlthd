import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { EntityBase } from '../../common/entity/entity.base';
import { BankInternalAccount } from '../bank-internal-account.entity';
import { Role } from './role.entity';

@Entity({
  name: 'users',
})
export class User extends EntityBase {
  @Column({
    name: 'user_name',
  })
  username: string;

  @Column({
    name: 'password',
  })
  password: string;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    name: 'refresh_token',
  })
  refreshToken: string;

  @OneToMany(() => BankInternalAccount, bankAccount => bankAccount.user,
    {
      cascade: true,
    })
  bankAccounts: BankInternalAccount[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]
}