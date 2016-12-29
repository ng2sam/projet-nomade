import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AssociationServices, AuthService } from '../providers';
import { AssociationActions } from '../actions';
import { Observable } from 'rxjs/rx';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AssociationEffects {
   // storage:Storage = new Storage();
  constructor(
    private actions$: Actions,
    private _associationService: AssociationServices,
    private _associationActions: AssociationActions,
    private auth: AuthService
  ) { }

    // tslint:disable-next-line:member-ordering
    @Effect() loadAssociations$ = this.actions$
        .ofType(AssociationActions.LOAD_ASSOCIATIONS)
        .switchMap(() => 
            this._associationService.getAssociations()
            .map(associations => this._associationActions.loadAssociationsSuccess(associations))
            .catch(error => Observable.of(this._associationActions.getAssociationError(error))
        ));

    @Effect() getAssociation$ = this.actions$
        .ofType(AssociationActions.GET_ASSOCIATION)
        .map<string>(action => action.payload)
        .switchMap(id => 
            this._associationService.getAssociation(id)
            .map(association => this._associationActions.getAssociationSuccess(association))
            .catch(error => Observable.of(this._associationActions.getAssociationError(error))
        ));

    @Effect() saveAssociation$ = this.actions$
        .ofType(AssociationActions.SAVE_ASSOCIATION)
        .map(action => action.payload)
        .switchMap(association => 
            this._associationService.saveAssociation(association)
            .mergeMap(
                (association) => {
                return Observable.from([this._associationActions.saveAssociationSuccess(association), this._associationActions.loadAssociations() ]);
            })
            .catch(error => Observable.of(this._associationActions.getAssociationError(error))
        ));

    @Effect() addAssociation$ = this.actions$
        .ofType(AssociationActions.ADD_ASSOCIATION)
        .map(action => action.payload)
        .switchMap(association => 
            this._associationService.saveAssociation(association)
            .mergeMap(
                (association) => {
                return Observable.from([this._associationActions.addAssociationSuccess(association), this._associationActions.loadAssociations() ]);
            })
            .catch(error => Observable.of(this._associationActions.getAssociationError(error))
        ));

    @Effect() deleteAssociation$ = this.actions$
        .ofType(AssociationActions.DELETE_ASSOCIATION)
        .map(action => action.payload)
        .switchMap(association => 
            this._associationService.deleteAssociation(association)
            .map(association => this._associationActions.deleteAssociationSuccess(association))
            .catch(error => Observable.of(this._associationActions.getAssociationError(error))
        ));

    @Effect() errorStatus$ = this.actions$
        .ofType(AssociationActions.API_ASSOCIATION_FAILED)
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
