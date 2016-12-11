import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DirectoryDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-directory-detail',
  templateUrl: 'directory-detail.html'
})
export class DirectoryDetailPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DirectoryDetailPage Page');
  }

}
