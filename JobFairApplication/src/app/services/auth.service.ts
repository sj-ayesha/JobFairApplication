import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
 
  constructor() {}
 
  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  login(): void {
    this.isLoggedIn = true;
  }
 
  // Logout a user, destroy token and remove
  // every information related to a user
  logout(): void {
    this.isLoggedIn = false;
  }
 
  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated(): boolean {
    return this.isLoggedIn;
  }
}
