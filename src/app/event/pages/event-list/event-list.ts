import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-event-list',
  templateUrl: './event-list.html'
})
export class EventListPage {

  // @Input() events;
  // @Input() selectedEvent;

  @Output() onSelect = new EventEmitter();

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello EventListPage Page');
  }

}
