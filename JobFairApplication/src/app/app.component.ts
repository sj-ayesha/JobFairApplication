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
    // this.authService.isLoggedIn().subscribe(data => {
    //   if (data) {
    //     this.loggedIn = data;
    //     this.changeDetectorRef.detectChanges();
    //   }
    //   else {
    //     this.loggedIn = false;
    //   }
    // });
    // console.log(this.loggedIn);

    this.loginLogoutService.cast.subscribe(loggedIn => this.loggedIn = loggedIn);
    console.log(this.loggedIn);
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
