import { Injectable } from '@angular/core';
import {Action} from '@ngrx/store';
import { Observable } from 'rxjs/rx';
import { IError } from '../models';


// typage a faire
@Injectable()
export class ErrorActions {

     static LOAD_ERROR = '[Error] load error empty ';
     static GET_ERROR = '[Error] erreur ';

    loadError(): Action {
        return {
            type: ErrorActions.LOAD_ERROR
        };
    }

    getError(error: any): Action {
        return {
            type: ErrorActions.GET_ERROR,
            payload: error
        };
    }


}
