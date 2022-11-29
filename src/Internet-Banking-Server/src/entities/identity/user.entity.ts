import { BeforeInsert, Column, Entity, Index, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { EntityBase } from '../../common/entity/entity.base';
import { BankInternalAccount } from '../bank-internal-account.entity';
import { Role } from './role.entity';
import * as argon2 from 'argon2';

@Entity({
  name: 'users',
})
export class User extends EntityBase {
  @Index({ unique: true })
  @Column({
    name: 'user_name',
    unique: true,
  })
  userName: string;
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
    nullable: true,
  })
  refreshToken: string;
  @OneToMany(() => BankInternalAccount, bankAccount => bankAccount.user,
    {
      cascade: true,
    })
  bankAccounts: BankInternalAccount[];
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  constructor(
    userName: string,
    password: string,
    firstName: string,
    lastName: string) {
    super();
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}