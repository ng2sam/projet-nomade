import {Action} from '@ngrx/store';  
import { AssociationActions } from '../actions';
import { IAssociation } from '../models';
import { AppState } from '../providers';
import * as _ from 'lodash';



export function AssociationsReducer (state: IAssociation[] = [], action: Action) {
    switch (action.type) {
        case AssociationActions.LOAD_ASSOCIATIONS_SUCCESS: {
            return action.payload;
        }
        case AssociationActions.ADD_ASSOCIATION_SUCCESS: {
            return [...state, action.payload];
        }
        case AssociationActions.SAVE_ASSOCIATION_SUCCESS: {
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
        case AssociationActions.DELETE_ASSOCIATION_SUCCESS: {
            return state.filter(association => {
                return association._id !== action.payload.id;
            });
        }
        default: {
            return state;
        }
    }
}
