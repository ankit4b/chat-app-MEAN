import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  
  setAuthToken(token: string) {
    localStorage.setItem("token",token);
  }

  clearAuthToken(){
    localStorage.removeItem("token");
  }

  getAuthToken(){
    return localStorage.getItem("token");
  }
  
  logout(){
    this.clearAuthToken();
    this.router.navigate([''])
  }

  isLoggedIn(){
    return this.getAuthToken() !== null;
  }
}
