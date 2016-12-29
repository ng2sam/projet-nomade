import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class BlogPage {
    menu: string = "tous";
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello blog Page');
  }

}
