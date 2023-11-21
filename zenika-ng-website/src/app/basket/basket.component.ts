import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';

@Component({
  standalone: true,
  selector: 'app-basket',
  imports: [CurrencyPipe],
  templateUrl: './basket.component.html',
})
export class BasketComponent implements OnInit {
  protected customer: Customer = { name: '', address: '', creditCard: '' };

  private basketService = inject(BasketService);

  private router = inject(Router);

  protected items = this.basketService.items;

  protected total = this.basketService.total;

  ngOnInit(): void {
    this.basketService.fetch().subscribe();
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => this.router.navigate(['']));
  }
}
