import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-blog-detail',
  templateUrl: 'blog-detail.html'
})
export class BlogDetailPage implements OnInit {
   article: any;
  constructor(public navCtrl: NavController,  private _params: NavParams) { }

  ngOnInit() {
    this.article = this._params.get('param');
  }

  ionViewDidLoad() {
    console.log('Hello blog-detail Page');
  }

}
