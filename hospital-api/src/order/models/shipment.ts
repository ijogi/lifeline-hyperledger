import { Product } from './product';

export interface Shipment {
  id: string;
  orderCode: string;
  orderId: string;
  from: string;
  to: string;
  ETA: string;
  createdDate: Date;
  modifiedDate: Date;
  receivedDate: Date;
  status: string;
  location: string;
  products: Product[] | string;
  totalItemsCount: number;
}
