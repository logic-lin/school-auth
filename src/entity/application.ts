import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

@Entity('application')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  @Generated('uuid')
  secret: string;

  @Column()
  user_id: string;

  @Column()
  callback_url: string;

  @CreateDateColumn()
  create_time?: Date;

  @UpdateDateColumn()
  update_time?: Date;
}
