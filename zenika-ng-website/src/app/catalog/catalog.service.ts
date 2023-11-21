import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { Product } from './product/product.types';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private _products$ = new BehaviorSubject<Product[]>([]);

  products$ = this._products$.asObservable();

  isStockEmpty$ = this._products$.pipe(map((products) => products.every(({ stock }) => stock === 0)));

  protected apiService = inject(ApiService);

  fetch(): Observable<Product[]> {
    return this.apiService.getProducts().pipe(tap((products) => this._products$.next(products)));
  }

  decreaseStock(productId: string): void {
    this._products$.next(
      this._products$.value.map((product) => {
        if (product.id === productId) {
          return { ...product, stock: product.stock - 1 };
        }
        return product;
      }),
    );
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }
}
