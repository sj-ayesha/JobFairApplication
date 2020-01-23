import { Component, OnInit } from '@angular/core';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Router } from '@angular/router';
import { ChangeVenueService } from 'src/app/services/change-venue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
})
export class NavSidebarComponent implements OnInit {
  public venueName: string;
  count: number;
  dissabled = true;
  private sessionStateSubscription: Subscription;
  loggedIn: boolean;
  clickDashboard: false;

  venue: string;
  changeVenue: string;

  constructor(
    private loginLogoutService: LoginLogoutService,
    private router: Router,
    private changeVenueService: ChangeVenueService,
  ) { }

  ngOnInit() {
    this.loggedIn = !!localStorage.getItem('user');
    this.venueName = window.localStorage.getItem('venueName');
    this.sessionStateSubscription = this.loginLogoutService.sessionStateEmitter.subscribe(data => this.loggedIn = data);

    this.changeVenueService.cast.subscribe(data => this.venue = data);

    this.changeVenueService.editVenue(window.localStorage.getItem('venueName'));

    let toggler = document.getElementsByClassName("caret");
    let i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }
  }
  ngOnDestroy() {
    this.sessionStateSubscription.unsubscribe();
  }

  logout() {
    this.loggedIn = false;
    this.loginLogoutService.showDashboard(false);
    localStorage.removeItem('user');
    localStorage.removeItem('venue_id');
    localStorage.removeItem('priority');
    localStorage.removeItem('jobId');
    localStorage.removeItem('venueName');
    this.loginLogoutService.logoutUser();
    this.venue = '';
  }

  navigateToVenue(){
    // this.ngZone.run(() => this.router.navigateByUrl('/venue'));
    this.router.navigateByUrl('/venue');
    localStorage.removeItem('venue_id');
    localStorage.removeItem('priority');
    localStorage.removeItem('jobId');
    localStorage.removeItem('venueName');
  }

  navigateToHome() {
    if (localStorage.user !== undefined && localStorage.venue_id !== undefined) {
      this.router.navigate(['/home']);
    } else {
      this.dissabled = true;
    }
  }

  navigateToDashboard() {
    // this.dashboard = true;
    this.router.navigate(['/dashboard']);
  }
}
