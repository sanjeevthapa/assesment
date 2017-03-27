//import all the dependencies
import { Component } from '@angular/core';
//create and validate the forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController , Loading, LoadingController,AlertController,MenuController} from 'ionic-angular';
//import page to later push into nav stack
import {DashboardPage} from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';//storage for localstorage
import {Myservice} from '../../providers/myservice';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Myservice]
})


export class LoginPage {
  public Loginform : any;
  public storage  : any;
  //inject dependencies
  constructor(public navCtrl: NavController, public loginFormBuilder: FormBuilder,public loadingCtrl: LoadingController,  storage:Storage,public alertCtrl: AlertController, public menuCtrl: MenuController,private myservice: Myservice) {
    this.storage=storage;
    this.Loginform  = this.loginFormBuilder.group({
      "username":["",Validators.required],
      "password":["",Validators.required],
    });
    this.menuCtrl.swipeEnable(false);
  }
  login(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.myservice.validate(this.Loginform.value).subscribe(response=> {
      console.log(response);
      if(response==1){
        this.storage.set('isloggedin','true');
        this.storage.set('username','sanjeev');
        this.storage.set('userid','1');
        loader.dismiss();
        this.navCtrl.push(DashboardPage);
      }else{
        let alert = this.alertCtrl.create({
            title: 'Failure',
            subTitle: 'Invalid Credentials Supplied.',
            buttons: ['OK']
          });
        this.Loginform.reset();
        loader.dismiss();
        alert.present();
      }
    })
    return false;


  }//end of login
  gotoForgetPass(){
    // this.navCtrl.push(ForgetpasswordPage);
  }

}
