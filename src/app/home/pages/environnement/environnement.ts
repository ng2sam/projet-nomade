import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-environnement',
  templateUrl: 'environnement.html'
})
export class EnvironnementPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello environnement Page');
  }

}
