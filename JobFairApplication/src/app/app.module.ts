import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { ComponentsModule } from './components/components.module';
import { NavComponent } from './components/nav/nav.component';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './services/auth.guard';

// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { File } from '@ionic-native/file/ngx';

import { VenuePopupPageModule } from './back-office/venue-popup/venue-popup.module';
import { SkillPopupPageModule } from './back-office/skill-popup/skill-popup.module';
import { AuthFrontOfficeGuard } from './services/auth-frontOffice.guard';
import { JobsPopupPageModule } from './back-office/jobs-popup/jobs-popup.module';
import { TokenInterceptor } from './services/interceptor';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    NavSidebarComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    VenuePopupPageModule,
    SkillPopupPageModule,
    JobsPopupPageModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    AuthFrontOfficeGuard,
    ApiService,
    
    { provide:
      RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    { provide:
      HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // Camera,
    // File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
