import { Product } from "./product";
import { Shipment } from "./shipment";

export interface Order {
  id: string;
  code: string;
  from: string;
  to: string;
  createdDate: Date;
  modifiedDate: Date;
  status: string;
  totalPrice: number;
  products: Product[];
  shipments: Shipment[];
}
