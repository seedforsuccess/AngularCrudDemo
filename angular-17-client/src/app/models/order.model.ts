export type OrderStatus = 'NEW' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';

export interface Order {
  id?: number;
  customerName: string;
  product: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
}

export type OrderRequest = Omit<Order, 'id'>;
