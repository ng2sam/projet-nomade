import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// import {Observable} from 'rxjs/rx';
import { Observable } from 'rxjs/Observable';
import { AppState, EventService } from '../providers';
import { IEvent } from '../models';
import { EventActions } from '../actions';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class EventEffects {

  constructor(
    private actions$: Actions,
    private _eventService: EventService,
    private _eventActions: EventActions
  ) { }

  /*allEvents$ = this._eventService.getAll()
      .map(events => this._eventAction.loadEventsSuccess(events));

  changedEvents$ = this._eventService.getChanges()
      .map(change => {
          if (change._deleted) {
              return this._eventAction.deleteEventSuccess(change._id);
          }
          else {
              return this._eventAction.addUpdateEventSuccess(change);
          }
      });

  @Effect() getBirthdays$ = Observable.concat(this.allEvents$, this.changedEvents$);*/

    @Effect() loadEvents$ = this.actions$
        .ofType(EventActions.LOAD_EVENTS)
        .switchMap(() => this._eventService.getEvents())
        .map(events => this._eventActions.loadEventsSuccess(events));

    @Effect() getEvent$ = this.actions$
        .ofType(EventActions.GET_EVENT)
        .map<string>(action => action.payload)
        .switchMap(id => this._eventService.getEvent(id))
        .map(event => this._eventActions.getEventSuccess(event));

    @Effect() saveEvent$ = this.actions$
        .ofType(EventActions.SAVE_EVENT)
        .map(action => action.payload)
        .switchMap(event => this._eventService.saveEvent(event))
        .map(event => this._eventActions.saveEventSuccess(event));

    @Effect() addEvent$ = this.actions$
        .ofType(EventActions.ADD_EVENT)
        .map(action => action.payload)
        .switchMap(event => this._eventService.saveEvent(event))
        .map(event => this._eventActions.addEventSuccess(event));

    @Effect() deleteEvent$ = this.actions$
        .ofType(EventActions.DELETE_EVENT)
        .map(action => action.payload)
        .switchMap(event => this._eventService.deleteEvent(event))
        .map(event => this._eventActions.deleteEventSuccess(event));
}
