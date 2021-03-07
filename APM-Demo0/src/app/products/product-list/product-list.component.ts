// components
import { Component, OnInit, OnDestroy } from '@angular/core';

// services
import { ProductService }               from './../product.service';

// rxjs
import { Subscription }                 from 'rxjs';

// interfaces
import { HttpErrorResponse }            from '@angular/common/http';
import { Product }                      from './../product';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (errorResponse) => this.errorMessage = errorResponse.message
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.displayCode = !this.displayCode;
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
