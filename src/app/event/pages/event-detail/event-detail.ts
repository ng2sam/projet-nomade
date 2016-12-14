import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../../shared/models';


@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {

event: IEvent;

  constructor(private navCtrl: NavController, private params: NavParams) {}

  ngOnInit() {
    this.event = <IEvent>this.params.get('param');
  }
}
