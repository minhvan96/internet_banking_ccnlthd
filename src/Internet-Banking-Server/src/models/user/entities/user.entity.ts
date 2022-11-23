import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../../common/entity/entity.base';

@Entity()
export class User extends EntityBase {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  refreshToken: string;
}