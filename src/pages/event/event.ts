import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular'; 
import {Observable} from 'rxjs/rx';
import { Store } from '@ngrx/store';
import { EventActions } from '../../actions';
import { IEvent } from '../../models'
import { AppState } from '../../providers'; 
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

    events:  Observable<any>; //Observable<IEvent[]>;
    addingEvent: boolean = false;
    selectedEvent: IEvent;

    constructor(public navCtrl: NavController,
                private _eventActions : EventActions,
                private store: Store<AppState>) {
                  this.events = this.store.select('events');
                  
    }

  ionViewDidLoad() {
    console.log('Hello EventPage Page');
    this.store.dispatch(this._eventActions.loadEvents());

  }

  addEvent() {
      this.addingEvent = true;
      this.selectedEvent = null;
  }

  close() {
      this.addingEvent = false;
  }

  delete(event) {
      this.store.dispatch(this._eventActions.deleteEvent(event));
  }

  select(event) {
      console.log(event);
      this.selectedEvent = event;
      this.addingEvent = false;
  }

  gotoDetail() {
      //this.router.navigate(['/detail/', this.selectedEvent.id]);
  }
}
