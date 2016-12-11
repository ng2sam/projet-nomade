import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

const API_URL = '/assets/data/directory.json';


@Injectable()
export class DirectoryServices {

    constructor(private _http: Http) {
     }

    getContacts(): Observable<any[]> {
        return this._http.get(API_URL)
        .map(res => res.json())
        .catch((this.handleError));
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
