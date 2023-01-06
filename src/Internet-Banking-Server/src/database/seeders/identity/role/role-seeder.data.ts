import { Role } from "src/entities/identity/role.entity";
import { RoleConstants } from "../../../../common/constants/role-constants";

export const roles: Role[] = [
  new Role(RoleConstants.Administrator, 1),
  new Role(RoleConstants.Customer, 2),
  new Role(RoleConstants.Employee, 3)
];