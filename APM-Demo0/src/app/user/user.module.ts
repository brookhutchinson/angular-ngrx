// angular modules
import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { Routes }         from '@angular/router';

// shared modules
import { SharedModule }   from '../shared/shared.module';

// components
import { LoginComponent } from './login.component';

const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  // modules
  imports: [
    // angular modules
    RouterModule.forChild(userRoutes),
    // shared modules
    SharedModule
  ],
  // components
  declarations: [
    LoginComponent
  ]
})
export class UserModule {}
