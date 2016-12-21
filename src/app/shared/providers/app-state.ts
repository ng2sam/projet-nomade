import { IEvent, IError } from '../models';

export interface AppState {
    events: IEvent[];
    event: IEvent;
    error: IError;
}
