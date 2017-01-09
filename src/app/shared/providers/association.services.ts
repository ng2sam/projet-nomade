import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IAssociation } from '../models';
import { AppState, AuthService } from '../providers';
import { ErrorActions } from '../actions';

const API_URL = 'https://migrant-app.herokuapp.com/associations/';


@Injectable()
export class AssociationServices {
      error: string;
    constructor(private _http: AuthHttp,  private store: Store<AppState>, private _errAction:ErrorActions) {
        //this.error = this.store.select('error');
        // this.store.dispatch(this._errAction.loadError());
    }

    getAssociations(): Observable<IAssociation[]> {
        return this._http.get(API_URL)
        .map(res => res.json())
        .catch((this.handleError));
    }

    getAssociation(id): Observable<IAssociation> {
        return this._http.get(API_URL + id)
        .map(res => res.json())
        .catch((this.handleError));
    }

    saveAssociation(association) {
        if (association._id === "0" || association._id === null) {
            return this._http.post(API_URL, association)
            .map(res => res.json())
            .catch((this.handleError));
        } else {
            return this._http.put(API_URL + association._id, association)
            .map(res => res.json())
            .catch((this.handleError));
        }
    }

    deleteAssociation(association) {
        return this._http.delete(API_URL + association._id)
        .map(res => association)
        .catch((this.handleError));
    }

    private handleError(error: Response) {
        console.log(error);
        //this.store.dispatch(this._errAction.getError(error.toString()));
        //this.store.dispatch(this._associationActions.loadAssociationFailed(Observable.throw(error)));
        this.error = error.toString();
      
        return Observable.throw(error.toString());
        //return Observable.from([ Observable.throw(error.toString()), this.store.dispatch(this._errAction.getError(error.toString()))]);
}


}

