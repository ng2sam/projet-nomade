import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Store} from '@ngrx/store';  
import {Observable} from 'rxjs/rx';

import { AppState } from '../../providers';  
import { IEvent } from '../../models';  
 

/*
  Generated class for the Event page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPage {

    public events: Observable<IEvent[]>;

    constructor(
        public navCtrl: NavController,
        private store: Store<AppState>) {
    }

  ionViewDidLoad() {
    console.log('Hello EventPage Page');
     this.events = this.store.select(state => state.events);
     console.log(this.events);
  }

}
