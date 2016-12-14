import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
//declare var google;
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
  contact:any;

  @ViewChild('mapPage') MapPage: MapPage;

  constructor(private navCtrl: NavController, private params: NavParams) {}

  ngOnInit() {
    this.contact = this.params.get('param');

    setTimeout(()=>{
      this.MapPage.loadMap();
    },1000)
    
  }

}
