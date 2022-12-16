import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../common/entity/entity.base';

@Entity({
  name: 'roles',
})
export class Role extends EntityBase {
  @Column({
    name: 'name',
  })
  name: string;

  constructor(name: string, id?: number) {
    super(id);
    this.name = name;
  }
}