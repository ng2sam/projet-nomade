import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DashboardUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard-user',
  templateUrl: 'dashboard-user.html'
})
export class DashboardUserPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DashboardUserPage Page');
  }

}
