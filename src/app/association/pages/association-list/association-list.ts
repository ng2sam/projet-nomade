import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-association-list',
  templateUrl: './association-list.html'
})
export class AssociationListPage {

   @Input() associations;
   @Input() selectedAssociation;

  @Output() onSelect = new EventEmitter();

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AssociationListPage Page');
  }

}
