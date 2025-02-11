import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import { Identity } from './identity.entity';
import { Group } from './group.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment', { name: 'role_id' })
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
  description?: string;

  @CreateDateColumn({
    name: 'role_created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'role_updated_at',
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'role_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToMany(() => Identity, (identity) => identity.roles)
  identities: Identity[];

  @ManyToMany(() => Group, (group) => group.roles)
  groups: Group[];
}
