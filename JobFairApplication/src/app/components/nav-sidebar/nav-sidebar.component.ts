import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Router } from '@angular/router';
import { ChangeVenueService } from 'src/app/services/change-venue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
})
export class NavSidebarComponent implements OnInit, OnDestroy {
  private sessionStateSubscription: Subscription;

  dissabled = true;
  loggedIn: boolean;
  clickDashboard: false;

  count: number;

  public venueName: string;
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

    this.treeViewNav();
  }

  ngOnDestroy() {
    this.sessionStateSubscription.unsubscribe();
  }

  treeViewNav() {
    const toggler = document.getElementsByClassName('caret');
    let i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('caret-down');
      });
    }
  }

  logout() {
    this.loggedIn = false;
    localStorage.clear();
    this.loginLogoutService.logoutUser();
    this.venue = '';
  }

  navigateToVenue(){
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
    this.router.navigate(['/dashboard']);
  }
}
