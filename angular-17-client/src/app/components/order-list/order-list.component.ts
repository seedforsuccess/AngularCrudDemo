import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderStoreService } from '../../services/order-store.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  @Input() orders: Order[] = [];

  constructor(private orderStore: OrderStoreService) {}

  selectOrder(order: Order): void {
    this.orderStore.select(order);
  }
}
