import {ViewChild, provide} from '@angular/core';
import {Http} from '@angular/http';
import {App, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './providers/auth-service/auth';

import {GettingStartedPage} from './pages/getting-started/getting-started';
import {Home} from './pages/home/home.component';
import {ListPage} from './pages/list/list';
import {Verbal} from './pages/verbal/verbal';
import {Aptitude} from './pages/aptitude/aptitude';

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
    AuthService
  ]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  pages: Array<{ title: string, component: any }>

  constructor(private platform: Platform, private authHttp: AuthHttp, private auth: AuthService) {
    this.initializeApp();
    // auth.login();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'List', component: ListPage },
      { title: 'Verbal', component: Verbal },
      { title: 'Aptitude', component: Aptitude }
    ];

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
