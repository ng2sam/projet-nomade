import { IEvent } from '../models';

export interface AppState {
    events: IEvent[];
    event: IEvent;
}
