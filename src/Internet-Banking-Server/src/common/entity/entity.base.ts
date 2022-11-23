import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  idDeleted: boolean;
}