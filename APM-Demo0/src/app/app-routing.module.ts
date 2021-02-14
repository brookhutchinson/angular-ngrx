// angular modules
import { NgModule }              from '@angular/core';
import { RouterModule }          from '@angular/router';
import { Routes }                from '@angular/router';

// components
import { PageNotFoundComponent } from './home/page-not-found.component';
import { ShellComponent }        from './home/shell.component';
import { WelcomeComponent }      from './home/welcome.component';

// guards
import { AuthGuard }             from './user/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      // welcome route
      { path: 'welcome', component: WelcomeComponent },
      // product list route
      {
        path: 'products',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
      },
      // base route
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },
  // widlcard route
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  // modules
  imports: [
    // angular modules
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  // exports
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
