import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginLogoutService } from './services/login-logout.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  loggedIn: string;
  logged: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private loginLogoutService: LoginLogoutService,

  ) {
    // this.initializeApp();
    // this.loggedIn = false;
  }

  ngOnInit(): void {
    // this.loginLogoutService.cast.subscribe(data => {
    //   console.log(data);
    //   if (!!data) {
    //     this.loggedIn = true;
    //     console.log('true', this.loggedIn);
    //   } else {
    //     this.loggedIn = false;
    //     console.log('false', this.loggedIn);
    //   }
    // });

    this.loginLogoutService.cast.subscribe(data => this.loggedIn = data);
    console.log(this.loggedIn);
  }

  ionViewWillLeave(){
    console.log('left');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
