import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Store } from '@ngrx/store';
import { EventActions } from '../shared/actions';
import { IEvent } from '../shared/models';
import { AppState } from '../shared/providers';
import { EventDetailPage } from './pages'

@Component({
  selector: 'page-event',
  templateUrl: './event.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPage {

    events:  Observable<any>; // Observable<IEvent[]>;
    addingEvent: boolean = false;
    selectedEvent: IEvent;

    constructor(public navCtrl: NavController,
                private _eventActions: EventActions,
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

  select($event) {
      console.log($event);
      this.selectedEvent = $event;
      this.gotoDetail(this.selectedEvent)
  }

  gotoDetail(event:any) {
      // this.router.navigate(['/detail/', this.selectedEvent.id]);
      this.navCtrl.push(EventDetailPage, {param: event});
  }
}
