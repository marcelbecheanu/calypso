import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { Role } from './role.entity';
import { Group } from './group.entity';
import { hashLevel } from '../constants/identity.config';

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
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'identity_updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'identity_deleted_at',
    type: 'timestamp',
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

  @BeforeUpdate()
  @BeforeInsert()
  async encryptPassword() {
    if (this.password) {
      const saltRounds = hashLevel;
      const salt = await genSalt(saltRounds);
      this.password = await hash(this.password, salt);
    }
  }

  async compareHash(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
