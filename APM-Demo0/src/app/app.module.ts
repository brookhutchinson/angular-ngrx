// angular modules
import { NgModule }                       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { HttpClientModule }               from '@angular/common/http';

// imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData }                    from './products/product-data';

// app routing module
import { AppRoutingModule }               from './app-routing.module';

// components
import { AppComponent }                   from './app.component';
import { MenuComponent }                  from './home/menu.component';
import { PageNotFoundComponent }          from './home/page-not-found.component';
import { ShellComponent }                 from './home/shell.component';
import { WelcomeComponent }               from './home/welcome.component';

// feature modules
import { UserModule }                     from './user/user.module';

@NgModule({
  // modules
  imports: [
    // angular modules
    BrowserModule, HttpClientModule,
    // in-memory web api
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    // feature modules
    UserModule,
    // app routing module
    AppRoutingModule
  ],
  // components
  declarations: [
    AppComponent,
    MenuComponent,
    PageNotFoundComponent,
    ShellComponent,
    WelcomeComponent,
  ],
  // bootstrap
  bootstrap: [ AppComponent ]
})
export class AppModule {}
