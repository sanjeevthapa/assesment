//load the req dependencies
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Input} from '../input/input';
import {Output} from '../output/output';
/*
  class for page dashboard
  * handles the navigations
  * displays the dashboard page
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  //navigate to input page
  gotoInput(){
    this.navCtrl.push(Input);
  }
  //navigate to output page
  gotoOutput(){
    this.navCtrl.push(Output);
  }

}
