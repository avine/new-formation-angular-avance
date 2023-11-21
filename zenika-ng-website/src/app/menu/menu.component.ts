import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private basketService = inject(BasketService);

  protected numberOfItems$ = this.basketService.numberOfItems$;
}
