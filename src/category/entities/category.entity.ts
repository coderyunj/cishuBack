import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column({ nullable: false, length: 200 })
  category_name: string;

  @Column({ nullable: false })
  category_type: number;

  @Column()
  @CreateDateColumn()
  create_time: string;

  @Column()
  @UpdateDateColumn()
  update_time: string;
}
