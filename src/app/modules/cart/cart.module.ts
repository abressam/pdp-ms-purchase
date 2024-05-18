import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from '@app/modules/cart/models/cart.model';
import { CartService } from '@app/modules/cart/services/cart.service';
import { CartController } from '@app/modules/cart/controllers/cart.controller';

@Module({
  imports: [SequelizeModule.forFeature([Cart])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
