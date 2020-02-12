import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { ToastController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private toastCtrl: ToastController,
        private router: Router) {
    }

    async unsuccessMsg() {
        const toast = await this.toastCtrl.create({
          message: 'Invalid Username or Password',
          position: 'top',
          color: 'danger',
          duration: 2000,
          cssClass: 'toast-custom'
        });
        toast.present();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = window.localStorage.getItem('token');

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }

        if (request.url.includes('candidate-file')) {

        }

        return next.handle(request).pipe(
            catchError(err => {
                // console.log(err);
                if (err instanceof HttpErrorResponse) {
                    // console.log(err.status);
                    // console.log(err.statusText);
                    if (err.status === 401) {
                        this.unsuccessMsg();
                        setTimeout(() => {
                            this.router.navigateByUrl('/login');
                        }, 2000);
                    }
                }
                // return Observable.throw(err);
                return throwError(err);
            }));
        // return next.handle(request);
    }
}
