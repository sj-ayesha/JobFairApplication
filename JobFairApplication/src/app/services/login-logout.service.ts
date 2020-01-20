import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  @Output() sessionStateEmitter = new EventEmitter<boolean>();
  constructor(private router: Router) {
  }

  loginUser() {
    this.sessionStateEmitter.emit(true);
    this.router.navigate(['/dashboard']);
    /* if (this.isLoggedIn = true) {
      this.router.navigate(['/venue']);
    }
    else {
      this.router.navigate(['/login']);
    } */
  }
  logoutUser() {
    this.sessionStateEmitter.emit(false);
    this.router.navigate(['/venue']);
  }
}
