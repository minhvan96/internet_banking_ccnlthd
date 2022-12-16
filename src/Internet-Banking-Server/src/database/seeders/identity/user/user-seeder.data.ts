import { User } from 'src/entities/identity/user.entity';
import { BankInternalAccount } from '../../../../entities/bank-internal-account.entity';
import { roles } from '../role/role-seeder.data';

const testUsers = (): User[] => {
  const adminUser = new User('admin', '123456@Abc', 'first name', 'last name');
  adminUser.roles = []
  adminUser.roles.push(roles.find(x=>x.id === 1));
  const customer1 = new User('customer01', '123456@Abc', 'CTM FN', 'CTM LN');
  customer1.bankAccount = new BankInternalAccount('06546546456');
  customer1.roles = []
  customer1.roles.push(roles.find(x=>x.id === 2));
  const customer2 = new User('customer02', '123456@Abc', 'CTM FN', 'CTM LN');
  customer2.bankAccount = new BankInternalAccount('06849789788');
  customer2.roles = []
  customer2.roles.push(roles.find(x=>x.id === 2));
  return [adminUser, customer1, customer2];
};
export const users: User[] = testUsers();