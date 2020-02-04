import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');

        let headers;
        const authorization = `Bearer ${token}`;
        if (token) {
            headers = { 'Authorization': authorization };
        }

        if (!req.url.includes('candidate-file')) {
            headers = { 'Content-Type': 'application/json' };
        }

        req = req.clone({ setHeaders: headers });

        return next.handle(req);
    }

}
