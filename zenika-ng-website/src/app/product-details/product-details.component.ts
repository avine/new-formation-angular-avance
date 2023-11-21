import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../catalog/product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  protected product?: Product;

  private apiService = inject(ApiService);

  private activatedRoute = inject(ActivatedRoute);

  private changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.apiService.getProduct(this.activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY]).subscribe((product) => {
      this.product = product;
      this.changeDetectorRef.markForCheck();
    });
  }
}
