import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderStoreService } from '../../services/order-store.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent {
  readonly searchControl = new FormControl('', { nonNullable: true });

  constructor(private orderStore: OrderStoreService) {
    this.searchControl.valueChanges.subscribe((term) => this.orderStore.search(term));
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
