import { Role } from 'src/entities/identity/role.entity';

export const roles: Role[] = [
  new Role('administrator', 1),
  new Role('customer',2),
];