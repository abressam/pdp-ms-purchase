import { 
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Address } from '@app/modules/address/models/address.model';
import { Cart } from '@app/modules/cart/models/cart.model';

@Table({
  tableName: 'Customer',
  timestamps: false,
})
export class Customer extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  cpf: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, allowNull: false })
  fk_Address_id: number;

  @HasMany(() => Cart)
  carts: Cart[];
}
