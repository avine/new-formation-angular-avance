import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { zip } from 'rxjs';
import { WELCOME_MSG } from '../app.token';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.types';

@Component({
  standalone: true,
  selector: 'app-catalog',
  imports: [RouterLink, ProductComponent, CurrencyPipe],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  protected welcomeMsg = inject(WELCOME_MSG);

  private basketService = inject(BasketService);

  private catalogService = inject(CatalogService);

  protected total = this.basketService.total;

  protected products = this.catalogService.products;

  protected isStockEmpty = this.catalogService.isStockEmpty;

  protected isAvailable(product: Product) {
    return this.catalogService.isAvailable(product);
  }

  ngOnInit(): void {
    zip([this.basketService.fetch(), this.catalogService.fetch()]).subscribe();
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => {
      this.catalogService.decreaseStock(product.id);
    });
  }
}
