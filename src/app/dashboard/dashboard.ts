import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { AuthService  } from '../shared/providers/';
import { EventPage  } from '../event/';
import { IUser  } from '../shared/models/';
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  user:IUser;
  constructor(public navCtrl: NavController, private _auth: AuthService) {
    this.user = this._auth.getUser();
  }

  ionViewDidLoad() {
    console.log('Hello DashboardPage Page');
  }

goBack(){
  this.navCtrl.pop();
}
goEvent(fab: FabContainer){
  fab.close();
  this.navCtrl.push(EventPage);
  
}
}
