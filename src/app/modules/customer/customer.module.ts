import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from '@app/modules/customer/models/customer.model';

@Module({
  imports: [SequelizeModule.forFeature([Customer])],
})
export class CustomerModule {}
