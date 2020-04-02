import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CoreModule, SharedModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
