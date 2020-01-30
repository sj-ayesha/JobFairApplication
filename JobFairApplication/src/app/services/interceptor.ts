import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

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
            // headers = { 'Content-Type': 'application/json' };
            // request = request.clone({
            //     setHeaders: {
            //         'Content-Type': '*/*'
            //     }
            // });
            /* request = request.clone({ responseType: 'text' }); */
        }

        return next.handle(request);
    }
}