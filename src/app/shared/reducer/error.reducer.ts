import {Action} from '@ngrx/store';  
import { EventActions } from '../actions';
import { IError } from '../models';
import { AppState } from '../providers';
import * as _ from 'lodash';

const initialState: IError = {
    name: null
};

export function ErrorReducer (state = initialState, action: Action) : IError {
    switch (action.type) {
        case EventActions.RESET_BLANK_ERROR: {
            return initialState;
        }
        case EventActions.API_EVENT_FAILED: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}