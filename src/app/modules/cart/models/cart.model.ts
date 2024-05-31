import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'Cart',
  timestamps: false,
})
export class Cart extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  fk_Product_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  fk_Customer_id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  fk_Purchase_id: number;
}
