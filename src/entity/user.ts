import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { encryptPassword } from '../util/encrypt';

export enum Gender {
  Man = 1,
  Female = 2,
  Unknown = 3,
}

export enum VerifyStatus {
  Allow = 1,
  Refuse = 2,
  Pending = 3,
}

export enum Role {
  Super = 1,
  Admin = 2,
  Normal = 3,
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = encryptPassword(this.password);
    }
  }
  @Column({
    nullable: true,
  })
  id_card?: string;

  @Column({
    nullable: true,
    unique: true,
  })
  student_card?: string;

  @Column({
    nullable: true,
  })
  name?: string;

  @Column({
    nullable: true,
  })
  certificate?: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({
    type: 'enum',
    enum: VerifyStatus,
    nullable: true,
  })
  verify_status?: VerifyStatus;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Normal,
  })
  role: Role;

  @CreateDateColumn()
  create_time?: Date;

  @UpdateDateColumn()
  update_time?: Date;
}
