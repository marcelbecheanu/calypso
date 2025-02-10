import { CONFIGURABLE_MODULE_ID } from '@nestjs/common/module-utils/constants';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;

  @Column({
    name: 'role_code',
    unique: true,
    nullable: false,
    length: 80,
  })
  code: string;

  @Column({
    name: 'role_title',
    unique: true,
    nullable: false,
    length: 160,
  })
  title: string;

  @Column({
    name: 'role_description',
    nullable: true,
    length: 320,
  })
  description: string;

  @CreateDateColumn({
    name: 'role_created_at',
    type: 'timestamp',
    nullable: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'role_updated_at',
    type: 'timestamp',
    nullable: false
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'role_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
