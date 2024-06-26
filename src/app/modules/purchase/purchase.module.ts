import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from '@app/modules/cart/models/cart.model';
import { Purchase } from '@app/modules/purchase/models/purchase.model';
import { PurchaseService } from '@app/modules/purchase/services/purchase.service';
import { PurchaseController } from '@app/modules/purchase/controllers/purchase.controller';

@Module({
  imports: [SequelizeModule.forFeature([Cart, Purchase])],
  providers: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
