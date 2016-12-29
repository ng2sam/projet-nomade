import { IEvent, IError, IAssociation } from '../models';

export interface AppState {
    events: IEvent[];
    event: IEvent;
    associations: IAssociation[];
    association: IAssociation;
    error: IError;
}
