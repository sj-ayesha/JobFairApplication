import { Component, OnInit, OnDestroy, NgZone, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeVenueService } from 'src/app/services/change-venue.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {

  private sessionStateSubscription: Subscription;
  private HRSubscription: Subscription;
  private MANAGERSubscription: Subscription;
  private INTERVIEWERSubscription: Subscription;

  isLoggedIn = 'false';
  loggedIn: boolean;
  clickDashboard = false;
  dissabled = true;
  navDisplay: boolean;
  navDisplayHR: boolean;
  navDisplayINTERVIEWER: boolean;
  navDisplayMANAGER: boolean;

  role: string;
  venue: string;
  changeVenue: string;
  public venueName: string;
  count: number;


  constructor(
    private loginLogoutService: LoginLogoutService,
    private router: Router,
    private changeVenueService: ChangeVenueService,
    ) { }

  ngOnInit() {
    this.loggedIn = !!localStorage.getItem('visa');

    if (localStorage.getItem('role') === 'HR') {
      this.navDisplayHR = true;
    }
    if (localStorage.getItem('role') === 'INTERVIEWER') {
      this.navDisplayINTERVIEWER = true;
    }
    if (localStorage.getItem('role') === 'MANAGER') {
      this.navDisplayMANAGER = true;
    }

    this.sessionStateSubscription = this.loginLogoutService.sessionStateEmitter.subscribe(data => this.loggedIn = data);
    this.HRSubscription = this.loginLogoutService.EmitHR.subscribe(data => this.navDisplayHR = data);
    this.INTERVIEWERSubscription = this.loginLogoutService.EmitINTERVIEWER.subscribe(data => this.navDisplayINTERVIEWER = data);
    this.MANAGERSubscription = this.loginLogoutService.EmitMANAGER.subscribe(data => this.navDisplayMANAGER = data);

    this.venueName = window.localStorage.getItem('venueName');
    this.changeVenueService.cast.subscribe(data => this.venue = data);
    this.changeVenueService.editVenue(window.localStorage.getItem('venueName'));
  }

  ionViewWillEnter() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loginLogoutService.treeViewNav();
    }, 0);
  }

  ngOnDestroy() {
    this.sessionStateSubscription.unsubscribe();
    this.HRSubscription.unsubscribe();
    this.INTERVIEWERSubscription.unsubscribe();
    this.MANAGERSubscription.unsubscribe();
  }

  logout() {
    localStorage.clear();
    this.loginLogoutService.logoutUser();
    this.venue = '';
  }

  navigateToVenue() {
    this.router.navigateByUrl('/venue');
    localStorage.removeItem('priority');
    localStorage.removeItem('jobId');
  }

  navigateToHome() {
    if (localStorage.venue_id !== undefined) {
      this.router.navigate(['/home']);
    } else {
      this.dissabled = true;
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
