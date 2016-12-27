import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnvironnementPage } from '../environnement/environnement'

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  goEnv() {
    this.navCtrl.push(EnvironnementPage);
  }

}
