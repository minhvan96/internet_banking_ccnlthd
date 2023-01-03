import { BeforeInsert, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { EntityBase } from '../../common/entity/entity.base';
import { BankInternalAccount } from '../bank-internal-account.entity';
import { Role } from './role.entity';
import { hash } from 'argon2';
import { CustomerInternalBeneficiary } from '../customer-internal-beneficiary.entity';
import { CustomerExternalBeneficiary } from '../customer-external-beneficiary.entity';
import { DebtCustomer } from '../debt-customer.entity';

@Entity({
  name: 'users',
})
export class User extends EntityBase {
  @Index({unique: true})
  @Column({
    name: 'user_name',
    unique: true,
  })
  userName: string;

  @Index({unique: true})
  @Column({
    name: 'email',
  })
  email: string;

  @Column({
    name: 'phone_number'
  })
  phoneNumber: string

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

  @OneToOne(() => BankInternalAccount,
    {
      cascade: true,
    })
  @JoinColumn()
  bankAccount: BankInternalAccount;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => CustomerInternalBeneficiary, beneficiary => beneficiary.user,
    {
      cascade: true,
    })
  customerInternalBeneficiaries: CustomerInternalBeneficiary[];

  @OneToMany(() => CustomerExternalBeneficiary, beneficiary => beneficiary.user,
    {
      cascade: true,
    })
  customerExternalBeneficiaries: CustomerExternalBeneficiary[];

  @OneToMany(() => DebtCustomer, debtor => debtor.user,
    {
      cascade: true,
    })
  debtCustomer: DebtCustomer[];

  constructor(
    userName: string,
    password: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string) {
    super();
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}