import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../basket/basket.service';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [RouterLink, NgIf],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  private basketService = inject(BasketService);

  protected numberOfItems = this.basketService.numberOfItems;
}
