import {ActionReducer, Action} from '@ngrx/store';  
import { EventActions } from '../actions';
import { IEvent } from '../models';

let nextId = 0;

export function EventsReducer(state = [], action) {  
    switch(action.type) {
        case EventActions.ADD_EVENT:
            return [...state, Object.assign({}, action.payload, { id: nextId++ })];
        case EventActions.UPDATE_EVENT:
            return state.map((event: IEvent) => {
                return event.id === action.payload.id ? Object.assign({}, event, action.payload) : event;
            });
        case EventActions.DELETE_EVENT:
            return state.filter((event: IEvent) => event.id !== action.payload.id);
        default:
            return state;
    };
}