import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { EventActions } from '../../../shared/actions';
import { IEvent } from '../../../shared/models';
import { AppState } from '../../../shared/providers';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage implements OnInit, OnDestroy {

  idEvent: Subscription;
  event: Observable<any>;
  editMode = false;
  form = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl('')
  });
  //@Output() close = new EventEmitter();

  constructor(private store: Store<AppState>,
    private _eventActions: EventActions,
    private params: NavParams,
    public nav : NavController) {
    this.event = this.store.select('event');
  }

  ngOnInit() {
    this.idEvent = Observable.of(this.params.get('param'))
      .subscribe(id => {
        if (id) {
          console.log("id", id);
          this.store.dispatch(this._eventActions.getEvent(id));
          this.editMode = true;
        } else {
          this.store.dispatch(this._eventActions.resetBlankEvent());
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.idEvent.unsubscribe();
  }

  goBack(savedEvent: IEvent = null) {
   // this.close.emit(savedEvent);
   this.nav.pop();
   // if (this.editMode) {  }
  }

  save(event) {
    console.log("fdfds",event);
    if (event.id === 0) {
      this.store.dispatch(this._eventActions.addEvent(event));
    } else {
      console.log("event saved");
      this.store.dispatch(this._eventActions.saveEvent(event));
    }
    this.goBack(event);
  }
}
