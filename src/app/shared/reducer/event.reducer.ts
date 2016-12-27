import {Action} from '@ngrx/store';  
import { EventActions } from '../actions';
import { IEvent } from '../models';
import { AppState } from '../providers';
import * as _ from 'lodash';


const initialState: IEvent = {
    _id: "0",
    name: '',
    description:'',
    date: null,
    eventType: null, // 0 public, 1 semi-public, 2 privé
    organisateur: null // recu id user ?
};

export function EventReducer (state = initialState, action: Action) : IEvent {
    
    switch (action.type) {
        case EventActions.RESET_BLANK_EVENT: {
            let i = initialState;
            i.organisateur = action.payload;
            return i;
        }
        case EventActions.GET_EVENT_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}