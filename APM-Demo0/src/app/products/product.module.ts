// angular modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// shared modules
import { SharedModule } from './../shared/shared.module';

// components
import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  // modules
  imports: [
    // angular modules
    RouterModule.forChild(productRoutes),
    // shared modules
    SharedModule
  ],
  // components
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ]
})
export class ProductModule {}
