import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

        constructor(private router: Router) {

        }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
                const user = localStorage.getItem('visa');
                const role = localStorage.getItem('role');
                let isloggedIn;

                if (user) {
                        isloggedIn = true;
                } else {
                        isloggedIn = false;
                        this.router.navigateByUrl('/login');
                }
                return isloggedIn;
        }
}
