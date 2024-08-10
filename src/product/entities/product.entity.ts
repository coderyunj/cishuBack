import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ nullable: false, length: 200 })
  category_type: string;

  @Column()
  @CreateDateColumn()
  create_time: string;

  @Column()
  @UpdateDateColumn()
  update_time: string;

  @Column({ nullable: false, length: 200 })
  product_description: string;

  @Column({ nullable: false, length: 200 })
  product_img: string;

  @Column({ nullable: false, length: 200 })
  product_name: string;

  @Column({ nullable: false })
  product_price: number;

  @Column({ nullable: false })
  product_sell_price: number;

  @Column({ nullable: false, length: 20 })
  product_status: string;

  @Column({ nullable: false, length: 10 })
  product_stock: string;

  @Column({ nullable: false, length: 10 })
  product_theme: string;
}
