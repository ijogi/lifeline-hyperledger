import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CoreModule } from 'src/core/core.module';
import { FabricService } from 'src/core/services/fabric.service';

@Module({
  imports: [CoreModule],
  controllers: [OrderController],
  providers: [OrderService, FabricService]
})
export class OrderModule {}
