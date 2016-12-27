import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EventServices, AuthService } from '../providers';
import { EventActions, ErrorActions } from '../actions';
import { Observable } from 'rxjs/rx';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class EventEffects {
   // storage:Storage = new Storage();
  constructor(
    private actions$: Actions,
    private _eventService: EventServices,
    private _eventActions: EventActions,
    private _errorActions: ErrorActions,
    private auth: AuthService
  ) { }

    // tslint:disable-next-line:member-ordering
    @Effect() loadEvents$ = this.actions$
        .ofType(EventActions.LOAD_EVENTS)
        .switchMap(() => 
            this._eventService.getEvents()
            .map(events => this._eventActions.loadEventsSuccess(events))
            .catch(error => Observable.of(this._eventActions.getEventError(error))
        ));

    @Effect() getEvent$ = this.actions$
        .ofType(EventActions.GET_EVENT)
        .map<string>(action => action.payload)
        .switchMap(id => 
            this._eventService.getEvent(id)
            .map(event => this._eventActions.getEventSuccess(event))
            .catch(error => Observable.of(this._eventActions.getEventError(error))
        ));

    @Effect() saveEvent$ = this.actions$
        .ofType(EventActions.SAVE_EVENT)
        .map(action => action.payload)
        .switchMap(event => 
            this._eventService.saveEvent(event)
            .mergeMap(
                (event) => {
                return Observable.from([this._eventActions.saveEventSuccess(event), this._eventActions.loadEvents() ]);
            })
            .catch(error => Observable.of(this._eventActions.getEventError(error))
        ));

    @Effect() addEvent$ = this.actions$
        .ofType(EventActions.ADD_EVENT)
        .map(action => action.payload)
        .switchMap(event => 
            this._eventService.saveEvent(event)
            .mergeMap(
                (event) => {
                return Observable.from([this._eventActions.addEventSuccess(event), this._eventActions.loadEvents() ]);
            })
            .catch(error => Observable.of(this._eventActions.getEventError(error))
        ));

    @Effect() deleteEvent$ = this.actions$
        .ofType(EventActions.DELETE_EVENT)
        .map(action => action.payload)
        .switchMap(event => 
            this._eventService.deleteEvent(event)
            .map(event => this._eventActions.deleteEventSuccess(event))
            .catch(error => Observable.of(this._eventActions.getEventError(error))
        ));

    @Effect() errorStatus$ = this.actions$
        .ofType(EventActions.API_EVENT_FAILED)
        .map(action => action.payload)
        .switchMap(payload => {
           if(payload ==="Error"){
               this.auth.login();
               return Observable.empty();
           }else{
               return Observable.empty();
           }
        })
        .filter(()=>false)

    @Effect()
    authenticated$ = Observable
        .fromEvent(this.auth.lock, 'authenticated')
        .do((authResult: any) => {
           return this.auth.setToStorage(authResult);
        })
        .map((data: any) => {
            this.auth.successLogin(data);
        })
        .filter(()=>false)
}
