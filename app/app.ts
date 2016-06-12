import {ViewChild, provide, Type} from '@angular/core';
import {Http} from '@angular/http';
import {App, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './providers/auth-service/auth';
import * as moment from 'moment';

import {VerbalService} from './providers/verbal-service/tcs/verbal-service';
import {AptitudeService} from './providers/aptitude-service/tcs/aptitude.service';
import {UserService} from './providers/user-service/user.service';
import {Util} from './util/util'


import {Home} from './pages/home/home.component';
import {Verbal} from './pages/verbal/verbal';
import {Aptitude} from './pages/aptitude/aptitude';
import {Profile} from './pages/profile/profile';
import {About} from './pages/about/about';

@App({
  templateUrl: 'build/app.html',
  config: {
    backButtonIcon: 'md-arrow-back',
    iconMode: 'ios',
    modalEnter: 'modal-slide-in',
    modalLeave: 'modal-slide-out',
    tabbarPlacement: 'top',
    pageTransition: 'ios',
  }, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig(), http);
      },
      deps: [Http]
    }),
    AuthService,
    VerbalService,
    AptitudeService,
    UserService,
    Util
  ]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  pages: Array<{ title: string, component: any }>
  links: Array<{title:string, icon:string,component:any}>

  constructor(
    private platform: Platform,
    private authHttp: AuthHttp,
    private auth: AuthService,
    public verbalService: VerbalService,
    public aptitudeService: AptitudeService
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: Home },
      { title: 'Profile', component: Profile },
      { title: 'Verbal', component: Verbal },
      { title: 'Aptitude', component: Aptitude }
    ];

    this.links = [
      { title: "About", icon:"information-circle", component:About}
    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // When the app starts up, there might be a valid
      // token in local storage. If there is, we should
      // schedule an initial token refresh for when the
      // token expires
      this.auth.startupTokenRefresh();
      this.verbalService.load();
      this.aptitudeService.load();
    });
  }

  home() {
    this.nav.setRoot(this.rootPage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
