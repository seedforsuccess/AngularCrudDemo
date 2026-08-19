import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, debounceTime, distinctUntilChanged, shareReplay, startWith, switchMap, tap, throwError } from 'rxjs';
import { Order, OrderRequest } from '../models/order.model';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {
  private searchTermSubject = new BehaviorSubject('');
  private selectedOrderSubject = new BehaviorSubject<Order | null>(null);
  private refreshSubject = new Subject<void>();
  private errorSubject = new BehaviorSubject<string | null>(null);

  readonly selectedOrder$ = this.selectedOrderSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();
  readonly orders$: Observable<Order[]> = this.refreshSubject.pipe(
    startWith(void 0),
    switchMap(() => this.searchTermSubject.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((term) => this.orderService.search(term)),
      catchError(() => {
        this.errorSubject.next('Unable to load orders. Is the Spring Boot server running?');
        return [[]];
      })
    )),
    tap(() => this.errorSubject.next(null)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private orderService: OrderService) {}

  search(term: string): void {
    this.searchTermSubject.next(term.trim());
  }

  select(order: Order | null): void {
    this.selectedOrderSubject.next(order);
  }

  save(order: OrderRequest): Observable<Order> {
    const selected = this.selectedOrderSubject.value;
    const request$ = selected?.id
      ? this.orderService.update(selected.id, order)
      : this.orderService.create(order);

    return request$.pipe(
      tap((savedOrder) => {
        this.selectedOrderSubject.next(savedOrder);
        this.refreshSubject.next();
      }),
      catchError((error) => {
        this.errorSubject.next('Unable to save the order.');
        return throwError(() => error);
      })
    );
  }

  remove(order: Order): Observable<void> {
    if (!order.id) {
      return throwError(() => new Error('An order ID is required.'));
    }

    return this.orderService.delete(order.id).pipe(
      tap(() => {
        this.selectedOrderSubject.next(null);
        this.refreshSubject.next();
      }),
      catchError((error) => {
        this.errorSubject.next('Unable to delete the order.');
        return throwError(() => error);
      })
    );
  }

  clear(): void {
    this.selectedOrderSubject.next(null);
  }
}
