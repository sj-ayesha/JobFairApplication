import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  constructor(private loginLogoutService: LoginLogoutService, private router: Router) { }

  ngOnInit() {
    this.loggedIn = !!localStorage.getItem('user');
    this.venueName = window.localStorage.getItem('venueName');
    this.sessionStateSubscription = this.loginLogoutService.sessionStateEmitter.subscribe(data => this.loggedIn = data);
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
  }

  navigateToHome() {
    if (localStorage.user !== undefined && localStorage.venue_id !== undefined) {
      this.router.navigate(['/home']);
    } else {
      this.dissabled = true;
    }
  }
}
