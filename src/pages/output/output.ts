import { Component } from '@angular/core';
import {Myservice} from '../../providers/myservice';
import { NavController, NavParams ,LoadingController, Loading } from 'ionic-angular';

@Component({
  selector: 'page-output',
  templateUrl: 'output.html',
  providers: [Myservice]
})
/*
  *class output
  *gets photos data for that particular user
  *iterates over it
 */
export class Output {
  public loader:any;
  public photos : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private myservice: Myservice,public loadingCtrl: LoadingController) {

  }

  //begin nginit
  ngOnInit(){
    // console.log("onitinran");

    this.getPhotos();
  }

  //getphotos calls service and subscibes
  getPhotos(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      // duration: 3000
    });
    loader.present();
    this.myservice.getTasks().subscribe(response=> {
      // console.log(response);
      loader.dismiss();
      this.photos = response;
    })

  }


}
