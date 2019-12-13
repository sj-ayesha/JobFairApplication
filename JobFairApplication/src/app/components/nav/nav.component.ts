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
  public venueName: String;
  count: number;
  dissabled = true;
  private sessionStateSubscription: Subscription;
  loggedIn: boolean;
  constructor(private loginLogoutService: LoginLogoutService, private router: Router) { }

  ngOnInit() {
    // this.loginLogoutService.navigateToVenue();
    // this.loggedIn = this.loginLogoutService.isLoggedIn;
    // console.log("veryy good", this.loginLogoutService.isLoggedIn);
    this.loggedIn = !!localStorage.getItem('user');
    this.venueName = window.localStorage.getItem('venue_id');
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

  navigateToHome(){
    // this.count = JSON.parse(localStorage.priority).length;
    // console.log(this.count);
    // if (this.count >= 1){
    //   this.router.navigate(['/home']);
    // }
    // else {
    //   console.log("cannott");
    // }
    if (localStorage.user !== undefined){
      this.router.navigate(['/home']);
      
    }
    else{
      this.dissabled = true;
    }
  }

}
