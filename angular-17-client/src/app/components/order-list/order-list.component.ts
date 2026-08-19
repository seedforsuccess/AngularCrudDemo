import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
  @Output() orderSelected = new EventEmitter<Order>();

  selectOrder(order: Order): void {
    this.orderSelected.emit(order);
  }
}
