import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';
import { Group } from './group.entity';

@Entity({ name: 'identities' })
export class Identity {
  @PrimaryGeneratedColumn('increment', { name: 'identity_id' })
  id: number;

  @Column({
    name: 'identity_email',
    unique: true,
    nullable: false,
    length: 320,
  })
  email: string;

  @Column({
    name: 'identity_password',
    nullable: false,
    length: 128,
  })
  password: string;

  @Column({
    name: 'identity_is_confirmed',
    default: false,
    nullable: false,
  })
  isConfirmed: boolean;

  @CreateDateColumn({
    name: 'identity_created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'identity_updated_at',
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'identity_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToMany(() => Role, (role) => role.identities)
  @JoinTable({
    name: 'identity_roles',
    joinColumn: { name: 'identity_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];


  @ManyToMany(() => Group, (group) => group.identities)
  @JoinTable({
    name: 'identity_groups',
    joinColumn: { name: 'identity_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  groups: Group[];
}