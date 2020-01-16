import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeVenueService } from 'src/app/services/change-venue.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  public venueName: string;
  count: number;
  dissabled = true;
  private sessionStateSubscription: Subscription;
  loggedIn: boolean;

  venue: string;
  changeVenue: string;

  dashboard = true;

  constructor(
    private loginLogoutService: LoginLogoutService,
    private router: Router,
    private changeVenueService: ChangeVenueService,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
    this.loggedIn = !!localStorage.getItem('user');
    this.venueName = window.localStorage.getItem('venueName');
    this.sessionStateSubscription = this.loginLogoutService.sessionStateEmitter.subscribe(data => this.loggedIn = data);

    this.changeVenueService.cast.subscribe(data => this.venue = data);

    this.changeVenueService.editVenue(window.localStorage.getItem('venueName'));
  }

  ngOnDestroy() {
    this.sessionStateSubscription.unsubscribe();
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('venue_id');
    localStorage.removeItem('priority');
    localStorage.removeItem('jobId');
    localStorage.removeItem('venueName');
    this.loginLogoutService.logoutUser();
    this.venue = '';
    // this.dashboard = false;
  }

  goToVenue(){
    this.ngZone.run(() => this.router.navigateByUrl('/venue'));
    // this.router.navigateByUrl('/venue');
  }

  navigateToHome() {
    if (localStorage.user !== undefined && localStorage.venue_id !== undefined) {
      this.router.navigate(['/home']);
    } else {
      this.dissabled = true;
    }
  }

  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
    // this.dashboard = true;
  }
}
