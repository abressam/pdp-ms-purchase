import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthcheckModule } from '@app/modules/healthcheck/healthcheck.module';
import { SessionMiddleware } from '@app/modules/session/middlewares/session.middleware';
import { PurchaseModule } from '@app/modules/purchase/purchase.module';
import { PurchaseController } from '@app/modules/purchase/controllers/purchase.controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import appConfig from '@app/configs/app.config';
import dbConfig from '@app/configs/db.config';
import { CartController } from '@app/modules/cart/controllers/cart.controller';
import { CartModule } from '@app/modules/cart/cart.module';

@Module({
  imports: [
    HealthcheckModule,
    CartModule,
    PurchaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    SequelizeModule.forRoot(dbConfig),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes(CartController);
    consumer.apply(SessionMiddleware).forRoutes(PurchaseController);
  }
}
