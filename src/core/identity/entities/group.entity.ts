import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Identity } from "./identity.entity";
import { Role } from "./role.entity";

@Entity({ name: 'groups' })
export class Group {

  @PrimaryGeneratedColumn({ name: 'group_id' })
  id: number;

  @Column({ name: 'group_name', length: 80, nullable: false, unique: true })
  name: string;

  @Column({ name: 'group_description', length: 320, nullable: true })
  description?: string;

  @CreateDateColumn({
    name: 'group_created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'group_updated_at',
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'group_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToMany(() => Identity, (identity) => identity.groups)
  identities: Identity[];

  @ManyToMany(() => Role, (role) => role.groups)
  @JoinTable({
    name: 'group_rules',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

}