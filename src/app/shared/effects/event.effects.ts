import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EventServices } from '../providers';
import { EventActions } from '../actions';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class EventEffects {

  constructor(
    private actions$: Actions,
    private _eventService: EventServices,
    private _eventActions: EventActions
  ) { }

    // tslint:disable-next-line:member-ordering
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
