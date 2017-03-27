import { Component } from '@angular/core';
import {Myservice} from '../../providers/myservice';
import { NavController, NavParams } from 'ionic-angular';

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

  public photos : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private myservice: Myservice) {

  }

  //begin nginit
  ngOnInit(){
    // console.log("onitinran");
    this.getPhotos();
  }

  //getphotos calls service and subscibes
  getPhotos(){
    this.myservice.getTasks().subscribe(response=> {
      // console.log(response);
      this.photos = response;
    })
  }


}
