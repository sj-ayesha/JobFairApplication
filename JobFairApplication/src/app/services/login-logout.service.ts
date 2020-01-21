import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  isLoggedIn: string;
  private logged = new BehaviorSubject<string>(this.isLoggedIn);
  private storage = new BehaviorSubject<string>(localStorage.getItem('dashboard'));
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
    if (showDashboard === true) {
      this.logged.next(localStorage.getItem('dashboard'));
    } else {
      this.logged.next(null);
    }
    localStorage.setItem('dashboard', showDashboard);
  }

  getLoggedIn(): Observable<string> {
    return this.storage.asObservable();
  }
}
