import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Cart } from '@app/modules/cart/models/cart.model';
import { Product } from '@app/modules/product/models/product.model';

@Table({
    tableName: 'Cart_Products',
    timestamps: false,
})
export class CartProducts extends Model {
    @ForeignKey(() => Cart)
    @Column({ primaryKey: true, type: DataType.INTEGER })
    cart_id: number;

    @ForeignKey(() => Product)
    @Column({ primaryKey: true, type: DataType.INTEGER })
    product_id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity: number;

    @BelongsTo(() => Cart)
    cart: Cart;

    @BelongsTo(() => Product)
    product: Product;
}
  