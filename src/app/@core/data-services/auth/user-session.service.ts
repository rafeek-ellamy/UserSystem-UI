import { Injectable } from '@angular/core';
import { UserLoginInput } from '../../data-models/auth/auth-models';
import {Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { TokenClaims } from '../../data-models/shared-models';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {    
  private userKey = 'user_data'; 
  constructor(public router: Router) { }

  setUserData(userData: UserLoginInput) {
    localStorage.setItem(this.userKey, JSON.stringify(userData));
  }

  getUserData(): UserLoginInput | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  decodedToken() {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      const token = JSON.parse(user).token;  
      const decodedToken = jwtDecode(token) as TokenClaims; 
      return decodedToken;
    }
    return null;
  }

  token() {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      const token = JSON.parse(user).token;  
      return token;
    }
    return null;
  }

  isLoggedIn(): boolean | null {
    const user = localStorage.getItem(this.userKey);
    return user ? true : false;
  }

  clearUserData() {
    localStorage.removeItem(this.userKey);
  }

  logout() {
    localStorage.removeItem('user_data');
    this.router.navigate(['/auth/login']);
  }
}
