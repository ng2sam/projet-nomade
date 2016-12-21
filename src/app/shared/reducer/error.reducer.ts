import {Action} from '@ngrx/store';  
import { ErrorActions } from '../actions';
import { IError } from '../models';
import { AppState } from '../providers';
import * as _ from 'lodash';

const initialState: IError = {
    name: ''
};

export function ErrorReducer (state = initialState, action: Action) : IError {
    switch (action.type) {
        case ErrorActions.LOAD_ERROR: {
            return initialState;
        }
        case ErrorActions.GET_ERROR: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}