import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

        constructor(private router: Router) {

        }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
                // return undefined;
                const user = localStorage.getItem('visa');
                const venue = localStorage.getItem('venue_id');
                let isloggedIn;
                let hasVenue;

                if (user) {
                        isloggedIn = true;
                        // if (venue) {
                        //         hasVenue = true;
                        // } else {
                        //         hasVenue = false;
                        //         this.router.navigateByUrl('/venue');
                        // }
                } else {
                        isloggedIn = false;
                        this.router.navigateByUrl('/login');
                }
                return isloggedIn;
        }

        canActivate2(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
                return false;
        }
}
