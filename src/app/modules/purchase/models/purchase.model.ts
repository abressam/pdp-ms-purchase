import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'Purchase',
  timestamps: false,
})
export class Purchase extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  parcel: boolean;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  qt_parcel: number;

  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  fk_Customer_id: number;
}
