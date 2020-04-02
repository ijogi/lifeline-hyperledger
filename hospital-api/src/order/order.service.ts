import { OrderDto } from './dto/order.dto';
import { FabricService } from 'src/core/services/fabric.service';
import { Injectable } from '@nestjs/common';
import { Shipment } from './models/shipment';
import { Product } from './models/product';

@Injectable()
export class OrderService {
  private contract = null;

  constructor(private fabricService: FabricService) {
    this.init();
  }

  private async init() {
    this.contract = await this.fabricService.getContract('order2', 'mychannel', 'user1');
  }

  async getOrder(id: string) {
    const response = await this.contract.submitTransaction('readOrder', id);
    const order = JSON.parse(response.toString('utf-8'));
    
    return order;
  }

  async createOrder({ id, code, initiator, recipient, products, shipments, status}: OrderDto) {
    await this.contract.submitTransaction('createOrder', id, code, initiator, products, recipient, shipments, status);
    return { status: 'OK', messsage: `Order with ID ${id} created` };;
  }

  async markAsCompleted(id: string) {
    await this.contract.submitTransaction('markAsCompleted', id);
    return { status: 'OK', messsage: 'Order marked as completed' };
  }
}
