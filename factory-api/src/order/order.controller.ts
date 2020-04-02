import { OrderService } from './order.service';
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { Product } from './models/product';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/:id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
  @Get('/user')
  getUser() {
    return this.orderService.getUser();
  }

  @Post('/:orderId/shipment/:shipmentId')
  createShipment(@Param('orderId') orderId: string, @Param('shipmentId') shipmentId: string, @Body() products: Product[]) {
    return this.orderService.createShipment(orderId, shipmentId, products);
  }

  @Patch('/:id/receive')
  receiveOrder(@Param('id') id: string) {
    return this.orderService.receiveOrder(id);
  }

}
