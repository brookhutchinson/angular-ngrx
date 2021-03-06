// angular
import { Injectable } from '@angular/core';

// interfaces
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null;
  redirectUrl: string;

  constructor() {}

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    // code here would log into a back end service and return user information
    // this is just hard-coded here
    this.currentUser = {
      id: 2,
      userName,
      isAdmin: false
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}
