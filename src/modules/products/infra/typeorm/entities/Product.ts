import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrderProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { IProducts } from '@modules/products/domain/models/IProduct';

@Entity('Products')
export default class Product implements IProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrderProducts, order_products => order_products.product)
  order_products: OrderProducts[];

  @CreateDateColumn()
  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
