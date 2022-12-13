import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class EntityBase {
  @PrimaryGeneratedColumn(
    {
      name: 'id',
    },
  )
  id: number;

  @CreateDateColumn({
    name: 'created_data',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_date',
  })
  updatedDate: Date;

  @Column({
    name: 'is_deleted',
    default: false,
  })
  idDeleted: boolean;
}