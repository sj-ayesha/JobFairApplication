import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RoleDto } from '../model/roleDto';

@Injectable()
export class AuthGuard implements CanActivate {
        roleDetails: RoleDto;
        constructor(
                private router: Router,
                private apiService: ApiService
        ) {

        }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
                const expectedRole: any[] = route.data.role;
                const user = localStorage.getItem('visa');
                const role = localStorage.getItem('role');
                const venue = localStorage.getItem('venue_id');
                let isloggedIn: boolean;

                if (user) {
                        isloggedIn = true;
                        for (let i = 0; i < expectedRole.length; i++) {
                                if (expectedRole[i] === role) {
                                        isloggedIn = true;
                                        break;
                                } else {
                                        isloggedIn = false;
                                        // this.router.navigateByUrl('/');
                                }
                        }
                } else {
                        isloggedIn = false;
                        this.router.navigateByUrl('/');
                }
                return isloggedIn;
        }

        getRoleDetails(): Observable<RoleDto> {
                return this.apiService.getRoleDetails(localStorage.getItem('role'));
        }
}
