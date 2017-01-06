import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-blog-detail',
  templateUrl: 'blog-detail.html'
})
export class BlogDetailPage implements OnInit {
   article: any;
  //photo: string = ' http://www.ville-geneve.ch/fileadmin/public/images/themes_et_demarches/environnement_urbain_et_espaces_verts/CONTENU-verre-dBAUMANN.jpg';
  constructor(public navCtrl: NavController,  private _params: NavParams) { }

  ngOnInit() {
    this.article = this._params.get('param');
  }

  ionViewDidLoad() {
    console.log('Hello blog-detail Page');
  }

}
