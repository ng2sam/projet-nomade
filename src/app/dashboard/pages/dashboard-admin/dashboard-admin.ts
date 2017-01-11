import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DashboardAdmin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard-admin',
  templateUrl: 'dashboard-admin.html'
})
export class DashboardAdminPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DashboardAdminPage Page');
  }

}
