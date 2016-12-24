import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ErrorActions } from '../actions';
import { Observable } from 'rxjs/rx';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ErrorEffects {
  constructor(
    private actions$: Actions,
    private _errorActions: ErrorActions
  ) { }

    // tslint:disable-next-line:member-ordering
    @Effect() loadError$ = this.actions$
        .ofType(ErrorActions.LOAD_ERROR)
        .do(() => console.log("error store loaded"));

    @Effect() getError$ = this.actions$
        .ofType(ErrorActions.GET_ERROR)
        .map(action => action.payload)
        .do((payload)=>console.log(payload))
        .filter(()=>false);

}
