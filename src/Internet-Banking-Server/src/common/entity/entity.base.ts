import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class EntityBase {
  @PrimaryGeneratedColumn(
    {
      name: 'Id',
    }
  )
  id: number;

  @CreateDateColumn({
    name: 'CreatedDate'
  })
  createdDate:Date;

  @UpdateDateColumn({
    name: 'UpdatedDate'
  })
  updatedDate: Date;

  @Column({
    name: 'IsDeleted',
    default: false,
  })
  idDeleted: boolean;
}