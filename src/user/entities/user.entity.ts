import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ nullable: false, length: 200 })
  openid: string;

  @Column({ nullable: false, length: 200 })
  username: string;

  @Column({ nullable: false, length: 200 })
  password: string;

  @Column()
  @CreateDateColumn()
  createDate: string;
}
