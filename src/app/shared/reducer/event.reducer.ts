import {Action} from '@ngrx/store';  
import { EventActions } from '../actions';
import { IEvent } from '../models';
import { AppState } from '../providers';
import * as _ from 'lodash';

const initialState: IEvent = {
    id: null,
    name: '',
    description:'',
    date: null,
    eventType: null, // 0 public, 1 semi-public, 2 privé
    organisatorId: null // recu id user ?
};

export function EventReducer (state = initialState, action: Action) : IEvent {
    switch (action.type) {
        case EventActions.RESET_BLANK_EVENT: {
            return initialState;
        }
        case EventActions.GET_EVENT_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}