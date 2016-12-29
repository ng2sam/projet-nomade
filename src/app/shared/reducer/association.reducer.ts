import {Action} from '@ngrx/store';  
import { AssociationActions } from '../actions';
import { IAssociation } from '../models';
import { AppState } from '../providers';
import * as _ from 'lodash';


const initialState: IAssociation = {
    _id: "0",
    name: '',
    adress: '',
    email: '',
    tel: '',
    schedule: '',
    website: '',
    description:'',
    valid: false,
    manager: null, 
    members: [],
    followers: [] 
};

export function AssociationReducer (state = initialState, action: Action) : IAssociation {
    
    switch (action.type) {
        case AssociationActions.RESET_BLANK_ASSOCIATION: {
            let i = initialState;
            i.manager = action.payload;
            return i;
        }
        case AssociationActions.GET_ASSOCIATION_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}