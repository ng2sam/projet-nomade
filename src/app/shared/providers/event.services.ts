import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IEvent } from '../models';
import { EventActions } from '../actions';
import { AppState } from '../providers';

const API_URL = 'http://localhost:3000/events/';


@Injectable()
export class EventServices {
      events:  Observable<any>;
    constructor(private _http: AuthHttp,  private store: Store<AppState>, private _eventActions:EventActions) {
        // this.events = this.store.select('events');
    }

    getEvents(): Observable<IEvent[]> {
        return this._http.get(API_URL)
        .map(res => res.json())
        .catch((this.handleError));
    }

    getEvent(id): Observable<IEvent> {
        return this._http.get(API_URL + id)
        .map(res => res.json());
    }

    saveEvent(event) {
        if (event._id === 0 || event._id === null) {
            return this._http.post(API_URL, event)
            .map(res => res.json());
        } else {
            return this._http.put(API_URL + event.id, event)
            .map(res => res.json());
        }
    }

    deleteEvent(event) {
        return this._http.delete(API_URL + event.id)
        .map(res => event);
    }

    private handleError(error: Response) {
        console.error(error);
        //this.store.dispatch(this._eventActions.loadEventFailed(Observable.throw(error)));
        return Observable.throw("error");
    }

   /* getAll(): Observable<IEvent[]> {
        return this._http.get(this._apiUrl+"/events")
            .map((res: Response) =>res.json()) 
            .catch(this.handleError);
    }

    getById(id: number): Observable<IEvent> {
        return this._http.get(this._apiUrl +"/event/${id}")
                .map((response: Response) => <IEvent> response.json())
                .do(data => console.log('All: ' +  JSON.stringify(data)))
                .catch(this.handleError);
    }

    add(event: IEvent): Observable<IEvent> {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    return this._http.post(this._apiUrl +"/event", { event })
            .map((response: Response) => <IEvent> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    // passer les changements ?
    update(id:number, event: IEvent): Observable<IEvent> {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    return this._http.post(this._apiUrl + "/event/${event.id}", { event })
            .map((response: Response) => <IEvent> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    delete(event: IEvent): Observable<IEvent> {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    return this._http.delete(this._apiUrl + "/event/${event.id}")
            .map((response: Response) => <IEvent> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }*/

// --
/*
  addEvent(event: IEvent): void {
    this.store.dispatch(
      this._eventAction.addEvent(event)
    );
  }

  deleteEvent(event: IEvent): void {
    this.store.dispatch(
      this._eventAction.deleteEvent(event.id)
    );
  }

  updateEvent(event: IEvent, changes: any): void {
    this.store.dispatch(
      this._eventAction.updateEvent(event.id, changes)
    );

  }*/

}

