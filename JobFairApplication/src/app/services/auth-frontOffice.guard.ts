import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthFrontOfficeGuard implements CanActivate {

        constructor(private router: Router) {

        }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
                // return undefined;
                // const user = localStorage.getItem('user');
                const venue = localStorage.getItem('venue_id');
                // let isloggedIn;
                let hasVenue;

                if (venue) {
                        hasVenue = true;
                        // if (venue) {
                        //         hasVenue = true;
                        // } else {
                        //         hasVenue = false;
                        //         this.router.navigateByUrl('/venue');
                        // }
                } else {
                        hasVenue = false;
                        this.router.navigateByUrl('/venue');
                }
                return hasVenue;
        }

        canActivate2(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
                return false;
        }
}
