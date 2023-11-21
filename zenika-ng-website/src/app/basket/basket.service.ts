import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _items$ = new BehaviorSubject<BasketItem[]>([]);

  items$ = this._items$.asObservable();

  total$ = this._items$.pipe(map((items) => items.reduce((total, { price }) => total + price, 0)));

  numberOfItems$ = this._items$.pipe(map(({ length }) => length));

  private apiService = inject(ApiService);

  fetch(): Observable<BasketItem[]> {
    return this.apiService.getBasket().pipe(tap((items) => this._items$.next(items)));
  }

  addItem(productId: string): Observable<BasketItem> {
    return this.apiService.addToBasket(productId).pipe(tap((item) => this._items$.next([...this._items$.value, item])));
  }

  checkout(customer: Customer): Observable<{ orderNumber: number }> {
    return this.apiService.checkoutBasket(customer).pipe(tap(() => this._items$.next([])));
  }
}
