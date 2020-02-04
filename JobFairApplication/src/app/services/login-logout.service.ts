import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  isLoggedIn: 'true';
  isHR = true;
  isINTERVIEWER = true;
  isMANAGER = true;

  private logged = new BehaviorSubject<string>(this.isLoggedIn);
  private storage = new BehaviorSubject<boolean>(localStorage.getItem('dashboard') && !!localStorage.getItem('dashboard').length);
  // cast = this.storage.asObservable();
  cast = this.logged.asObservable();

  private HR = new BehaviorSubject<boolean>(this.isHR);
  castHR = this.HR.asObservable();


  @Output() sessionStateEmitter = new EventEmitter<boolean>();
  @Output() EmitHR = new EventEmitter<boolean>();
  @Output() EmitMANAGER = new EventEmitter<boolean>();
  @Output() EmitINTERVIEWER = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  loginUser() {
    if (localStorage.getItem('visa').length >= 1) {
      this.sessionStateEmitter.emit(true);

      if (localStorage.getItem('role') === 'HR') {
        this.EmitHR.emit(true);
      }

      if (localStorage.getItem('role') === 'MANAGER') {
        this.EmitMANAGER.emit(true);
      }

      if (localStorage.getItem('role') === 'INTERVIEWER') {
        this.EmitINTERVIEWER.emit(true);
      }


      setTimeout(() => {
        this.treeViewNav();
      }, 0);
    }
  }

  logoutUser() {
    this.sessionStateEmitter.emit(false);
    this.EmitINTERVIEWER.emit(false);
    this.EmitMANAGER.emit(false);
    this.EmitHR.emit(false);
    this.router.navigate(['/venue']);
  }

  getLoggedIn(): Observable<boolean> {
    return this.storage.asObservable();
  }

  treeViewNav() {
    const toggler = document.getElementsByClassName('arrow');
    const activeList = document.getElementsByClassName('subnav');
    let i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('arrow-down');
        this.parentNode.classList.toggle('active');
      });

    }
  }

}
