// services
import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { HttpHeaders }      from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs';
import { of }              from 'rxjs';
import { Observable }      from 'rxjs';
import { throwError }      from 'rxjs';
import { catchError }      from 'rxjs/operators';
import { map }             from 'rxjs/operators';
import { tap }             from 'rxjs/operators';

// interfaces
import { Product }          from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private products: Product[];

  private selectedProductSource = new BehaviorSubject<Product | null>(null);
  selectedProductChanges$ = this.selectedProductSource.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedProduct(selectedProduct: Product | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  getProducts(): Observable<Product[]> {
    if (this.products) {
      return of(this.products);
    }

    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.products = data),
        catchError(this.handleError)
      );
  }

  // return an initialized product
  newProduct(): Product {
    return {
      id: 0,
      productName: '',
      productCode: 'New',
      description: '',
      starRating: 0
    };
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // product Id must be null for the Web API to assign an Id
    const newProduct = { ...product, id: null };
    return this.http.post<Product>(this.productsUrl, newProduct, { headers })
      .pipe(
        // write to console
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        tap(data => this.products.push(data)),
        // catch error
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, { headers })
      .pipe(
        // write to console
        tap(data => console.log('deleteProduct: ' + id)),
        tap(data => {
          const foundIndex = this.products.findIndex(item => item.id === id);

          if (foundIndex > -1) {
            this.products.splice(foundIndex, 1);
          }
        }),
        // catch error
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;

    return this.http.put<Product>(url, product, { headers })
      .pipe(
        // write to console
        tap(() => console.log('updateProduct: ' + product.id)),
        // update the item in the list
        // this is required because the selected product that was edited was a copy of the item from the array
        tap(() => {
          const foundIndex = this.products.findIndex(item => item.id === product.id);
          if (foundIndex > -1) {
            this.products[foundIndex] = product;
          }
        }),
        // return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      // client-side
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // server-error
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }

    // write to console
    console.error(err);

    // return error
    return throwError(errorMessage);
  }
}
