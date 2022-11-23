import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../../common/entity/entity.base';

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
}