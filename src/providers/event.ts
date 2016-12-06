import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IEvent } from '../models';


@Injectable()
export class EventService {

  private _eventUrl = 'http://localhost:3000/events';

  constructor(private _http: Http) {
    console.log('Hello Event Provider');
  }
    getProducts(): Observable<IEvent[]> {
        return this._http.get(this._eventUrl)
            .map((response: Response) => <IEvent[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IEvent> {
        return this._http.get(this._eventUrl +"/${id}")
            .map((response: Response) => <IEvent[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
}
}
