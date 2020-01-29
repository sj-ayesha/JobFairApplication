import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  isLoggedIn(): Observable<boolean> {
    const loggedin =  new BehaviorSubject<boolean>(false);

    if (localStorage.getItem('user')) {
      loggedin.next(true);
    } else {
      loggedin.next(false);
    }

    return loggedin.asObservable();
  }
}
