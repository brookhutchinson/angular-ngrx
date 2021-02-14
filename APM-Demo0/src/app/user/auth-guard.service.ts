// services
import { Injectable }             from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';
import { Router }                 from '@angular/router';
import { CanActivate }            from '@angular/router';

// services
import { AuthService }            from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // retain the attempted URL for redirection
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);

    return false;
  }
}
