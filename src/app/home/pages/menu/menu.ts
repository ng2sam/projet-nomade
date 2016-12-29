import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BlogPage } from '../blog/blog'
import { AssociationPage } from '../../../association/association'

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
    this.navCtrl.push(BlogPage);
  }

  goAssoc() {
    this.navCtrl.push(AssociationPage);
  }

}
