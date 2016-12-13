import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-directory-list',
  templateUrl: 'directory-list.html'
})
export class DirectoryListPage {
  @Input() contacts;
  @Input() selectedContact;

  @Output() onSelect = new EventEmitter();
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DirectoryListPage Page');
  }

}
