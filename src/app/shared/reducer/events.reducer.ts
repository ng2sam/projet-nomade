import {Action} from '@ngrx/store';  
import { EventActions } from '../actions';
import { IEvent } from '../models';
import { AppState } from '../providers';
import * as _ from 'lodash';
// (state: IEvent[] = [], {payload, type}: Action) {  
     /*switch (type) {
    case EventActions.CREATE_EVENT_SUCCESS:
      return [ ...state, payload.event ];

    case EventActions.DELETE_EVENT_SUCCESS:
      return state.filter((event: IEvent) => {
        return event.id !== payload.event.id;
      });

    case EventActions.LOAD_EVENTS_SUCCESS:
      return payload.events || [];

    case EventActions.UPDATE_EVENT_SUCCESS:
      return state.map((event: IEvent) => {
        return event.id === payload.event.id ? payload.event : event;
      });

    default:
      return state;
    }*/

// utulier app-stat


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
            return state.filter(hero => {
                return hero.id !== action.payload.id;
            });
        }
        default: {
            return state;
        }
    }
}
