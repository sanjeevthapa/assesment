//here goes all the dependencies
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Input } from '../pages/input/input';
import { Output } from '../pages/output/output';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Myservice} from '../providers/myservice';
//all the modules
@NgModule({
  declarations: [
    MyApp,
    Input,
    Output,
    LoginPage,
    DashboardPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  //entry components
  entryComponents: [
    MyApp,
    Input,
    Output,
    LoginPage,
    DashboardPage
  ],
  //here arethe providers
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Myservice
  ]
})
export class AppModule {}
