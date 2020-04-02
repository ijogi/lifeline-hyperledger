import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CoreModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
