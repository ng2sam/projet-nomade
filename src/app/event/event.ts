import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Store } from '@ngrx/store';
import { EventActions } from '../shared/actions';
import { IEvent } from '../shared/models';
import { AppState, AuthService } from '../shared/providers';
import { EventDetailPage } from './pages';

@Component({
  selector: 'page-event',
  templateUrl: './event.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPage {

    events:  Observable<any>; // Observable<IEvent[]>;
    error: Observable<any>;
    addingEvent: boolean = false;
    logged:boolean = true;
    selectedEvent: IEvent;
    storage: Storage = new Storage();
    constructor(public navCtrl: NavController,
                private _eventActions: EventActions,
                private store: Store<AppState>,
                public auth: AuthService) {
                  this.events = this.store.select('events');
                  this.error = this.store.select('error');
  
    }

  ionViewDidLoad() {
    this.store.dispatch(this._eventActions.loadEvents());
                 /*this.auth.authenticatedObservable()
                  .subscribe(
                      (data) => this.logged = data
                  ); */   
  }



  close() {
      console.log("closed");
      this.addingEvent = false;
  }

  delete(event) {
      this.store.dispatch(this._eventActions.deleteEvent(event));
  }

  select($event) {
      console.log($event);
      this.selectedEvent = $event;
      this.gotoDetail(this.selectedEvent._id);
  }

  gotoDetail(eventId: string) {
      this.navCtrl.push(EventDetailPage, {param: eventId});
  }
  addEvent() {
     this.navCtrl.push(EventDetailPage); 
  }
}
