import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderRequest } from '../models/order.model';

const baseUrl = 'http://localhost:8080/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  search(customerName = ''): Observable<Order[]> {
    const params = new HttpParams().set('customerName', customerName);
    return this.http.get<Order[]>(baseUrl, { params });
  }

  get(id: number): Observable<Order> {
    return this.http.get<Order>(`${baseUrl}/${id}`);
  }

  create(order: OrderRequest): Observable<Order> {
    return this.http.post<Order>(baseUrl, order);
  }

  update(id: number, order: OrderRequest): Observable<Order> {
    return this.http.put<Order>(`${baseUrl}/${id}`, order);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }
}
