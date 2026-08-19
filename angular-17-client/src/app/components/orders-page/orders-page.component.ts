import { Component } from '@angular/core';
import { OrderStoreService } from '../../services/order-store.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent {
  readonly orders$ = this.orderStore.orders$;
  readonly selectedOrder$ = this.orderStore.selectedOrder$;
  readonly error$ = this.orderStore.error$;

  constructor(private orderStore: OrderStoreService) {}
}
