import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/:id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Post()
  createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Patch('/:id/complete')
  markAsCompleted(@Param('id') id: string) {
    this.orderService.markAsCompleted(id);
  }

}
