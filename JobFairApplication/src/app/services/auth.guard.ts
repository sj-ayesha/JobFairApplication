import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RoleDto } from '../model/roleDto';

@Injectable()
export class AuthGuard implements CanActivate {
        roleDetails: RoleDto;
        x: boolean;
        constructor(
                private router: Router,
                private apiService: ApiService
        ) {

        }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
                const user = localStorage.getItem('visa');
                const role = localStorage.getItem('role');
                const venue = localStorage.getItem('venue_id');
                let isloggedIn: boolean;
                let hasVenue;

                if (user) {
                        isloggedIn = true
                        this.getRoleDetails().toPromise().then(data => {
                                isloggedIn = this.checkRoute(route, state, data);
                                console.log('logged in inside', isloggedIn);
                                this.x = isloggedIn;
                        });

                        console.log(this.x, ' xxxxx');
                        console.log('logged in outside', isloggedIn);

                } else {
                        isloggedIn = false;
                        this.router.navigateByUrl('/');
                        // // this.router.navigateByUrl('/login');
                        // if (venue) {
                        //         hasVenue = true;
                        // } else {
                        //         hasVenue = false;
                        //         this.router.navigateByUrl('/venue');
                        // }
                        // return hasVenue;
                }
                return isloggedIn;
        }

        getRoleDetails(): Observable<RoleDto> {
                return this.apiService.getRoleDetails(localStorage.getItem('role'));
        }



        checkRoute(state, route, roleDetails): boolean {
                if (state.url[0].path === 'candidate-list') {
                        if (roleDetails.candidateList === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path === 'candidate-add-profile') {
                        if (roleDetails.candidateAdd === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path === 'candidate-details') {
                        if (roleDetails.candidateDetail === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path === 'venue-bo') {
                        if (roleDetails.venueBo === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path === 'job-bo') {
                        if (roleDetails.jobBo === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path == 'skills-bo') {
                        if (roleDetails.skillBo === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path === 'venue-job') {
                        if (roleDetails.venueJobBo === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path === 'home') {
                        if (roleDetails.home === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path === 'job-list') {
                        if (roleDetails.jobList === false) {
                                return false;
                        } else {
                                return true;
                        }
                }
                if (state.url[0].path === 'dashboard') {
                        if (roleDetails.dashboard === false) {
                                return false;
                        } else {
                                return true;
                        }
                }


                console.log('routeurl', route.url[0].path);
                console.log('state', state.url[0].path);

                // if (state.url === '/venue-bo') {
                //         console.log('Hi route', state.url);
                // }
        }


}
