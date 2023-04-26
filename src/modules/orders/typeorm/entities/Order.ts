import Customers from '@modules/customers/typeorm/entities/Customers';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrderProducts from './OrdersProducts';

@Entity('Orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'customer_id' })
  customer: Customers;

  @OneToMany(() => OrderProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrderProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
