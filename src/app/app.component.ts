//load the dependencies
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Input } from '../pages/input/input';
import { Output } from '../pages/output/output';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';

//define component
@Component({
  templateUrl: 'app.html'
})
/*
  *Main Class for the app
  *defines the root page
  *checks if the users data already on session local storage
  *redirects to login if not
 */
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DashboardPage;

  pages: Array<{title: string, component: any}>;

  public storage : any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, storage: Storage ) {
    this.initializeApp();
    this.storage= storage;
    //generate sidebar navigation
    this.pages = [
      { title: 'Input', component: Input },
      { title: 'Output', component: Output }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  //nginit runs on every page or nav change
  ngOnInit(page){
    //check if storage is ready
    this.storage.ready().then(() => {
      //check if loggedin in locally
      this.storage.get('isloggedin').then((val) => {
        if(val=="false"){
          //user not logged in
          //send back to login
          this.nav.push(LoginPage);
        }
      })
    });
 }//end nginit

 //logout
 //clear the localstorage and call api
 //redirect to login
  logout(){
    this.storage.set('isloggedin','false');
    this.nav.push(LoginPage);
  }
}
