import {Action} from '@ngrx/store';  
import { EventActions } from '../actions';
import { IEvent } from '../models';
import { AppState } from '../providers';
import * as _ from 'lodash';



export function EventsReducer (state: IEvent[] = [], action: Action) {
    switch (action.type) {
        case EventActions.LOAD_EVENTS_SUCCESS: {
            return action.payload;
        }
        case EventActions.ADD_EVENT_SUCCESS: {
            return [...state, action.payload];
        }
        case EventActions.SAVE_EVENT_SUCCESS: {
            let index = _.findIndex(state, {id: action.payload.id});
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ];
            }
            return state;
        }
        case EventActions.DELETE_EVENT_SUCCESS: {
            return state.filter(event => {
                return event._id !== action.payload.id;
            });
        }
        default: {
            return state;
        }
    }
}
