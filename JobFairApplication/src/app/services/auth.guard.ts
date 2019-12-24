import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export  class AuthGuard implements CanActivate{

    constructor() {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
            // return undefined;
            return true;
    }

    canActivate2(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
            return false;
    }
}
