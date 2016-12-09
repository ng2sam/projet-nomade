import { Injectable } from '@angular/core';
import {Action} from '@ngrx/store';

import { IEvent } from '../models';


//typage a faire
@Injectable()
export class EventActions {

     static LOAD_EVENTS = '[Event] Load Events';
    loadEvents(): Action {
        return {
            type: EventActions.LOAD_EVENTS
        };
    }

    static LOAD_EVENTS_SUCCESS = '[Event] Load Events Success';
    loadEventsSuccess(events: IEvent[]): Action {
        return {
            type: EventActions.LOAD_EVENTS_SUCCESS,
            payload: events
        };
    }

    static GET_EVENT = '[Event] Get Event';
    getEvent(id): Action {
        return {
            type: EventActions.GET_EVENT,
            payload: id
        };
    }

    static GET_EVENT_SUCCESS = '[Event] Get Event Success';
    getEventSuccess(event): Action {
        return {
            type: EventActions.GET_EVENT_SUCCESS,
            payload: event
        };
    }

    static RESET_BLANK_EVENT = '[Event] Reset Blank Event';
    resetBlankEvent(): Action {
        return {
            type: EventActions.RESET_BLANK_EVENT
        };
    }

    static SAVE_EVENT = '[Event] Save Event';
    saveEvent(event): Action {
        return {
            type: EventActions.SAVE_EVENT,
            payload: event
        };
    }

    static SAVE_EVENT_SUCCESS = '[Event] Save Event Success';
    saveEventSuccess(event): Action {
        return {
            type: EventActions.SAVE_EVENT_SUCCESS,
            payload: event
        };
    }

    static ADD_EVENT = '[Event] Add Event';
    addEvent(event): Action {
        return {
            type: EventActions.ADD_EVENT,
            payload: event
        };
    }

    static ADD_EVENT_SUCCESS = '[Event] Add Event Success';
    addEventSuccess(event): Action {
        return {
            type: EventActions.ADD_EVENT_SUCCESS,
            payload: event
        };
    }

    static DELETE_EVENT = '[Event] Delete Event';
    deleteEvent(event): Action {
        return {
            type: EventActions.DELETE_EVENT,
            payload: event
        };
    }

    static DELETE_EVENT_SUCCESS = '[Event] Delete Event Success';
    deleteEventSuccess(event): Action {
        return {
            type: EventActions.DELETE_EVENT_SUCCESS,
            payload: event
        };
    }
/*
// CREATE
    static CREATE_EVENT = 'CREATE_EVENT';
    addEvent(event: IEvent): Action {
        return {
            type: EventActions.CREATE_EVENT,
            payload: event
        }
    }

    static CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
    addEventSuccess(event: IEvent): Action {
        return {
            type: EventActions.CREATE_EVENT_SUCCESS,
            payload: event
        }
    }

    static CREATE_EVENT_FAILED = 'CREATE_EVENT_FAILED';
    addEventFailed(error: any): Action {
        return {
            type: EventActions.CREATE_EVENT_FAILED,
            payload: error
        }
    }

// LOAD EVENTS !! A REGARDER PAYLOAD LOAD_EVENTS

    static LOAD_EVENTS = 'LOAD_EVENTS';
    loadEvent(): Action {
        return {
            type: EventActions.LOAD_EVENTS
        }
    }

    static LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS';
    loadEventSuccess(events: IEvent[]): Action {
        return {
            type: EventActions.LOAD_EVENTS_SUCCESS,
            payload: events
        }
    }

    static LOAD_EVENTS_FAILED = 'LOAD_EVENTS_FAILED';
    loadEventFailed(error: any): Action {
        return {
            type: EventActions.LOAD_EVENTS_FAILED,
            payload: error
        }
    }

// UPDATE

    static UPDATE_EVENT = 'UPDATE_EVENT';
    updateEvent(eventId: number, changes: any): Action {
        return {
            type: EventActions.UPDATE_EVENT,
            payload: { changes, eventId }
        }
    }

    static UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
    updateEventSuccess(event: IEvent): Action {
        return {
            type: EventActions.UPDATE_EVENT_SUCCESS,
            payload: event
        }
    }

    static UPDATE_EVENT_FAILED = 'UPDATE_EVENT_FAILED';
    updateEventFailed(error: any): Action {
        return {
            type: EventActions.UPDATE_EVENT_FAILED,
            payload: error
        }
    }

// DELETE 

    static DELETE_EVENT = 'DELETE_EVENT';
    deleteEvent(taskId: number): Action {
        return {
            type: EventActions.DELETE_EVENT,
            payload: taskId
        }
    }

    static DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
    deleteEventSuccess(event: IEvent): Action {
        return {
            type: EventActions.DELETE_EVENT_SUCCESS,
            payload: event
        }
    }

    static DELETE_EVENT_FAILED = 'DELETE_EVENT_FAILED';
    deleteEventFailed(error: any): Action {
        return {
            type: EventActions.DELETE_EVENT_FAILED,
            payload: error
        }
    }/*

/*    static LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS';  
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
    }*/

}
