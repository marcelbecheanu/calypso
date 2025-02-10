import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'identities' })
export class Identity {
  @PrimaryGeneratedColumn({ name: 'identity_id' })
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
    nullable: false
  })
  isConfirmed: boolean;

  @CreateDateColumn({
    name: 'identity_created_at',
    type: 'timestamp',
    nullable: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'identity_updated_at',
    type: 'timestamp',
    nullable: false
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'identity_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
