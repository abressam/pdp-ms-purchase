import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthcheckModule } from '@app/modules/healthcheck/healthcheck.module';
import { SessionMiddleware } from '@app/modules/session/middlewares/session.middleware';
import { PurchaseModule } from '@app/modules/purchase/purchase.module';
import { PurchaseController } from '@app/modules/purchase/controllers/purchase.controller';
import { RatingController } from '@app/modules/rating/controllers/rating.controller';
import { RatingModule } from '@app/modules/rating/rating.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import appConfig from '@app/configs/app.config';
import dbConfig from '@app/configs/db.config';

@Module({
  imports: [
    HealthcheckModule,
    PurchaseModule,
    RatingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    SequelizeModule.forRoot(dbConfig),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes(PurchaseController);
    consumer.apply(SessionMiddleware).forRoutes(RatingController)
  }
}
