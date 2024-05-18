import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { CartProducts } from '@app/modules/cart-products/models/cart-products.model';
import { Customer } from '@app/modules/customer/models/customer.model';

@Table({
  tableName: 'Cart',
  timestamps: false,
})
export class Cart extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  qt_total: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  status: boolean;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  fk_Customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @HasMany(() => CartProducts)
  cartProducts: CartProducts[];
}
