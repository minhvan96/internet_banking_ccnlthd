import { User } from 'src/entities/identity/user.entity';
import { BankInternalAccount } from '../../../../entities/bank-internal-account.entity';

const testUsers = (): User[] => {
  const adminUser = new User('admin', '123456@Abc', 'first name', 'last name');
  const customer1 = new User('customer01', '123456@Abc', 'CTM FN', 'CTM LN');
  const internalBankAccount1 = new BankInternalAccount('06546546456');
  customer1.bankAccount = internalBankAccount1;
  const customer2 = new User('customer02', '123456@Abc', 'CTM FN', 'CTM LN');
  const internalBankAccount2 = new BankInternalAccount('06849789788');
  customer2.bankAccount = internalBankAccount2;
  return [adminUser, customer1, customer2];
};
export const users: User[] = testUsers();