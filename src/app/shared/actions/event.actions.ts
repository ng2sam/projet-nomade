import { Injectable } from '@angular/core';
import {Action} from '@ngrx/store';
import { Observable } from 'rxjs/rx';
import { IEvent } from '../models';


// typage a faire
@Injectable()
export class EventActions {

     static LOAD_EVENTS = '[Event] Load Events';
     static LOAD_EVENTS_SUCCESS = '[Event] Load Events Success';
     static API_EVENT_FAILED = '[Event Error] Error on Event';
     static GET_EVENT = '[Event] Get Event';
     static GET_EVENT_SUCCESS = '[Event] Get Event Success';
     static RESET_BLANK_EVENT = '[Event] Reset Blank Event';
      static RESET_BLANK_ERROR = '[Event Error] Reset Blank ERROR';
     static SAVE_EVENT = '[Event] Save Event';
     static SAVE_EVENT_SUCCESS = '[Event] Save Event Success';
    static ADD_EVENT = '[Event] Add Event';
    static ADD_EVENT_SUCCESS = '[Event] Add Event Success';
    static DELETE_EVENT = '[Event] Delete Event';
    static DELETE_EVENT_SUCCESS = '[Event] Delete Event Success';

    loadEvents(): Action {
        return {
            type: EventActions.LOAD_EVENTS
        };
    }

    loadEventsSuccess(events: IEvent[]): Action {
        return {
            type: EventActions.LOAD_EVENTS_SUCCESS,
            payload: events
        };
    }

    getEventError(error: any): Action {
        return {
            type: EventActions.API_EVENT_FAILED,
            payload: error
        };
    }
    getEvent(id): Action {
        return {
            type: EventActions.GET_EVENT,
            payload: id
        };
    }

    getEventSuccess(event): Action {
        return {
            type: EventActions.GET_EVENT_SUCCESS,
            payload: event
        };
    }


    resetBlankEvent(idUser:string): Action {
        return {
            type: EventActions.RESET_BLANK_EVENT,
            payload : idUser
        };
    }
    resetBlankError(): Action {
        return {
            type: EventActions.RESET_BLANK_ERROR
        };
    }
    saveEvent(event): Action {
        return {
            type: EventActions.SAVE_EVENT,
            payload: event
        };
    }

    saveEventSuccess(event): Action {
        return {
            type: EventActions.SAVE_EVENT_SUCCESS,
            payload: event
        };
    }


    addEvent(event): Action {
        return {
            type: EventActions.ADD_EVENT,
            payload: event
        };
    }

    addEventSuccess(event): Action {
        return {
            type: EventActions.ADD_EVENT_SUCCESS,
            payload: event
        };
    }


    deleteEvent(event): Action {
        return {
            type: EventActions.DELETE_EVENT,
            payload: event
        };
    }

    deleteEventSuccess(event): Action {
        return {
            type: EventActions.DELETE_EVENT_SUCCESS,
            payload: event
        };
    }


}
