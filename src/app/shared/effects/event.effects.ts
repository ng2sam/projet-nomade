import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EventServices, AuthService } from '../providers';
import { EventActions } from '../actions';
import { Observable } from 'rxjs/rx';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class EventEffects {
    storage:Storage = new Storage();
  constructor(
    private actions$: Actions,
    private _eventService: EventServices,
    private _eventActions: EventActions,
    private auth: AuthService
  ) { }

    // tslint:disable-next-line:member-ordering
    @Effect() loadEvents$ = this.actions$
        .ofType(EventActions.LOAD_EVENTS)
        .switchMap(() => {console.log("LOADEV"); return this._eventService.getEvents()})
        .map(events => this._eventActions.loadEventsSuccess(events))
        .catch(error => this._eventActions.loadEventFailed(error));

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

    @Effect() errorStatus401$ = this.actions$
        .ofType(EventActions.LOAD_EVENTS_FAILED)
        .map(action => action.payload)
        .filter(payload => payload && payload ==="error")
        .switchMap(payload => {
           // Observable.concat({ type: 'CLEAR_TOKEN' });
            this.auth.login();
            return Observable.empty();
        })
        //.map(action => action.payload)

    @Effect()
    authenticated$ = Observable
        .fromEvent(this.auth.lock, 'authenticated')
        .do((authResult: any) => {
            this.storage.set('id_token', authResult.idToken);
            this.storage.set('refresh_token', authResult.refreshToken);
            console.log("autsuccess");
            this.auth.successLogin(authResult.idToken);
            console.log("authResult.idToken",authResult.idToken);
            //this._eventService.getEvents();
            //return Observable.empty();
            //this._eventActions.loadEvents();
            //return {type: EventActions.LOAD_EVENTS}
            //return Observable.empty();
        })
        .map(() => {return this._eventActions.loadEvents()/*{type: EventActions.LOAD_EVENTS}*/;})
        //.ignoreElements();
       // .switchMap(() => this._eventService.getEvents())
       // .map(events => {console.log("event",events); return this._eventActions.loadEventsSuccess(events)})
       // .catch(error => {console.log(error); return this._eventActions.loadEventFailed(error)});
       // .map(events => this._eventActions.loadEventsSuccess(events));
}
