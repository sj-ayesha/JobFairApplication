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

  loggedIn: boolean;
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
    console.log('app')
    this.loginLogoutService.cast.subscribe(data => {
      console.log(data);
      if (data !== null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
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
