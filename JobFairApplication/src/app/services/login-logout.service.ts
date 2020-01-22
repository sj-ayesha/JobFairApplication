import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  isLoggedIn: 'true';
  private logged = new BehaviorSubject<string>(this.isLoggedIn);
  private storage = new BehaviorSubject<boolean>(localStorage.getItem('dashboard') && !!localStorage.getItem('dashboard').length);
  // cast = this.storage.asObservable();
  cast = this.logged.asObservable();

  @Output() sessionStateEmitter = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  loginUser() {
    this.sessionStateEmitter.emit(true);
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

  getLoggedIn(): Observable<boolean> {
    return this.storage.asObservable();
  }

}
