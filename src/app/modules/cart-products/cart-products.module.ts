import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartProducts } from '@app/modules/cart-products/models/cart-products.model';

@Module({
  imports: [SequelizeModule.forFeature([CartProducts])],
})
export class CartProductsModule {}
