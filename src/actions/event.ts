import { Injectable } from '@angular/core';
import {Action} from '@ngrx/store';

import { IEvent } from '../models';

@Injectable()
export class EventActions {

    static ADD_EVENT = 'ADD_EVENT';
    addEvent(event: IEvent): Action {
        return {
            type: EventActions.ADD_EVENT,
            payload: event
        }
    }

    static UPDATE_EVENT = 'UPDATE_EVENT';
    updateEvent(event: IEvent): Action {
        return {
            type: EventActions.UPDATE_EVENT,
            payload: event
        }
    }

    static DELETE_EVENT = 'DELETE_EVENT';
    deleteEvent(event: IEvent): Action {
        return {
            type: EventActions.DELETE_EVENT,
            payload: event
        }
    }

    static LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS';  
    loadEventsSuccess(events: IEvent[]): Action {  
        return {
            type: EventActions.LOAD_EVENTS_SUCCESS,
            payload: events
        }
    }

    static ADD_UPDATE_EVENT_SUCCESS = 'ADD_UPDATE_EVENT_SUCCESS';  
    addUpdateEventSuccess(event: IEvent): Action {  
        return {
            type: EventActions.ADD_UPDATE_EVENT_SUCCESS,
            payload: event
        }
    }

    static DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';  
    deleteEventSuccess(id: string): Action {  
        return {
            type: EventActions.DELETE_EVENT_SUCCESS,
            payload: id
        }
    }

}
