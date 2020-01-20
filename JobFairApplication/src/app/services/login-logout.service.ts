import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  isLoggedIn = false;
  private logged = new BehaviorSubject<boolean>(this.isLoggedIn);
  cast = this.logged.asObservable();

  @Output() sessionStateEmitter = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private http: HttpClient) {
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

  showDashboard(showDashboard){
    this.logged.next(showDashboard);
  }
}
