import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'identity' })
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
    name: 'is_confirmed',
    default: false,
  })
  isConfirmed: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  
}
