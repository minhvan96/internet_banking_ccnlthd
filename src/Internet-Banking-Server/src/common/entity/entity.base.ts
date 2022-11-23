import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntityBase {
  @PrimaryGeneratedColumn(
    {
      name: 'Id',
    }
  )
  id: number;

  @Column({
    name: 'IsDeleted',
    default: false,
  })
  idDeleted: boolean;
}