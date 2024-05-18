import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@app/modules/product/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
})
export class ProductModule {}
