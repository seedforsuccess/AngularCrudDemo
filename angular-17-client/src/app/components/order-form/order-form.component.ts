import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Order, OrderRequest, OrderStatus } from '../../models/order.model';
import { OrderStoreService } from '../../services/order-store.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnChanges {
  @Input() selectedOrder: Order | null = null;
  saving = false;
  deleting = false;
  message = '';

  readonly statuses: OrderStatus[] = ['NEW', 'PROCESSING', 'SHIPPED', 'CANCELLED'];
  readonly orderForm = this.formBuilder.nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(2)]],
    product: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    totalAmount: [0, [Validators.required, Validators.min(0)]],
    status: ['NEW' as OrderStatus, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private orderStore: OrderStoreService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedOrder']) {
      if (this.selectedOrder) {
        this.orderForm.patchValue(this.selectedOrder);
        this.message = `Editing order #${this.selectedOrder.id}`;
      } else {
        this.resetForm();
      }
    }
  }

  submit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.message = '';
    const request: OrderRequest = this.orderForm.getRawValue();

    this.orderStore.save(request).subscribe({
      next: () => {
        this.saving = false;
        this.message = this.selectedOrder ? 'Order updated.' : 'Order created.';
        if (!this.selectedOrder) {
          this.resetForm(false);
        }
      },
      error: () => {
        this.saving = false;
      }
    });
  }

  delete(): void {
    if (!this.selectedOrder) {
      return;
    }

    this.deleting = true;
    this.orderStore.remove(this.selectedOrder).subscribe({
      next: () => {
        this.deleting = false;
        this.message = 'Order deleted.';
        this.resetForm();
      },
      error: () => {
        this.deleting = false;
      }
    });
  }

  clear(): void {
    this.orderStore.clear();
  }

  private resetForm(showMessage = true): void {
    this.orderForm.reset({
      customerName: '',
      product: '',
      quantity: 1,
      totalAmount: 0,
      status: 'NEW'
    });
    if (showMessage) {
      this.message = 'Ready for a new order.';
    }
  }
}
