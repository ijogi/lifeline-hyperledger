import { OrderDto } from './dto/order.dto';
import { FabricService } from 'src/core/services/fabric.service';
import { Injectable } from '@nestjs/common';
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
    const order = await this.contract.submitTransaction('readOrder', id);
    return JSON.parse(order.toString('utf-8')) as OrderDto;
  }

  async createShipment(orderId: string, shipmentId: string, products: Product[]) {
    console.table(products);
    await this.contract.submitTransaction('createShipment', orderId, shipmentId, JSON.stringify(products));
  }

  async receiveOrder(id: string) {
    const order = await this.contract.submitTransaction('receiveOrder', id);
    return JSON.parse(order.toString('utf-8')) as OrderDto;
  }

  async getUser() {
    return await this.contract.submitTransaction('getCurrentUser');
  }
}
