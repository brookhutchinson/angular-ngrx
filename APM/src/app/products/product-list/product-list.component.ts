// components
import { Component, OnInit, OnDestroy } from '@angular/core';

// services
import { ProductService } from './../product.service';

// rxjs
import { Subscription } from 'rxjs';

// interfaces
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './../product';

// store
import { Store } from '@ngrx/store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];

  // highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private store: Store<any>, private productService: ProductService) {}

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (errorResponse) => this.errorMessage = errorResponse.message
    );

    this.store.select('products').subscribe(
      (products) => {
        if (products ) {
          this.displayCode = products.showProductCode;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkboxChanged(): void {
    this.store.dispatch({
      type: '[Product] Toggle Product Code'
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
