import { Component, OnInit, OnDestroy }       from '@angular/core';

// angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// form validators
import { GenericValidator }                   from './../../shared/generic-validator';
import { NumberValidators }                   from './../../shared/number.validator';

// services
import { ProductService }                     from './../product.service';

// interfaces
import { HttpErrorResponse }                  from '@angular/common/http';
import { Product }                            from './../product';

// rxjs
import { Subscription }                       from 'rxjs';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Edit';
  errorMessage = '';
  productForm: FormGroup;

  product: Product | null;
  sub: Subscription;

  // use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    // define all of the validation messages for the form
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // define an instance of the validator for use with this form
    // pass in this form validation messages
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // define the form group
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // watch for changes to the currently selected product
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.displayProduct(currentProduct)
    );

    // watch for value changes for validation
    this.productForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.productForm)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // validate on blur, helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.productForm);
  }

  displayProduct(product: Product | null): void {
    // set the local product property
    this.product = product;

    if (product) {
      // reset the form back to pristine
      this.productForm.reset();

      // display the appropriate page title
      if (product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${product.productName}`;
      }

      // update data on the form
      this.productForm.patchValue({
        productName: product.productName,
        productCode: product.productCode,
        starRating: product.starRating,
        description: product.description
      });
    }
  }

  cancelEdit(product: Product): void {
    // redisplay the currently selected product, replace any edits made
    this.displayProduct(product);
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.productService.deleteProduct(product.id).subscribe(
          // next
          () => this.productService.changeSelectedProduct(null),
          // error
          (errorRepsonse: HttpErrorResponse) => this.errorMessage = errorRepsonse.message
        );
      }
    } else {
      // no need to delete product since product was never saved
      this.productService.changeSelectedProduct(null);
    }
  }

  saveProduct(originalProduct: Product): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // copy over all of the original product properties
        // then copy over the values from the form
        // this ensures values not on the form, such as the Id, are retained
        const product = { ...originalProduct, ...this.productForm.value };

        if (product.id === 0) {
          this.productService.createProduct(product).subscribe(
            (p: Product) => this.productService.changeSelectedProduct(p),
            (errorMessage: HttpErrorResponse) => this.errorMessage = errorMessage.message
          );
        } else {
          this.productService.updateProduct(product).subscribe(
            (p: Product) => this.productService.changeSelectedProduct(p),
            (errorMessage: HttpErrorResponse) => this.errorMessage = errorMessage.message
          );
        }
      }
    }
  }
}
