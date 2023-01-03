import { User } from 'src/entities/identity/user.entity';
import { BankInternalAccount } from '../../../../entities/bank-internal-account.entity';
import { roles } from '../role/role-seeder.data';
import { faker } from '@faker-js/faker';
import { pad } from '../../../../utilities/string-utilities';
import { CustomerInternalBeneficiary } from '../../../../entities/customer-internal-beneficiary.entity';

const testUsers = (): User[] => {
  const adminUser = new User(
    'admin',
    '123456@Abc',
    'admin@bank.com',
    '0999999999',
    'first name',
    'last name');
  adminUser.roles = []
  adminUser.roles.push(roles.find(x => x.id === 1));

  const customer1 = new User(
    'customer01',
    '123456@Abc',
    'customer1@bank.com',
    '0154654654',
    'CTM FN',
    'CTM LN');
  customer1.bankAccount = new BankInternalAccount('06546546456');
  customer1.bankAccount.balance = 100000000;
  customer1.roles = []
  customer1.roles.push(roles.find(x => x.id === 2));

  const customer2 = new User(
    'customer02',
    '123456@Abc',
    'customer2@bank.com',
    '02562468546',
    'CTM FN',
    'CTM LN');
  customer2.bankAccount = new BankInternalAccount('06849789788');
  customer2.bankAccount.balance = 200000000;
  customer2.roles = []
  customer2.roles.push(roles.find(x => x.id === 2));

  const result = new Array<User>;
  result.push(adminUser, customer1, customer2);
  for (let i = 0; i < 100; i++) {
    const randomUser = createRandomUser();
    if (result.find(x => x.userName === randomUser.userName || x.email === randomUser.email || x.phoneNumber == randomUser.phoneNumber)) continue;
    randomUser.bankAccount = new BankInternalAccount(randomUser.phoneNumber);
    result.push(randomUser)
  }

  return result;
};

function createRandomUser(): User {
  return new User(
    faker.internet.userName(),
    '123456@Abc',
    faker.internet.email(),
    faker.phone.number(),
    faker.name.firstName(),
    faker.name.lastName())
}

export const users: User[] = testUsers();