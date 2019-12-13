import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {

  private sessionStateSubscription: Subscription;
  loggedIn: boolean;
  constructor(private loginLogoutService: LoginLogoutService) { }

  ngOnInit() {
    // this.loginLogoutService.navigateToVenue();
    // this.loggedIn = this.loginLogoutService.isLoggedIn;
    // console.log("veryy good", this.loginLogoutService.isLoggedIn);
    this.loggedIn = !!localStorage.getItem('user');

    this.sessionStateSubscription = this.loginLogoutService.sessionStateEmitter.subscribe(data => this.loggedIn = data);
  }

  ngOnDestroy(){
    this.sessionStateSubscription.unsubscribe();
  }

  logout(){
    this.loggedIn = false;
    localStorage.removeItem('user');
    this.loginLogoutService.logoutUser();
  }

}
