import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  photoid: string;

  @Column({ nullable: false, length: 200 })
  userid: string;

  @Column({ nullable: false, length: 200 })
  description: string;
}
