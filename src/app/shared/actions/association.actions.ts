import { Injectable } from '@angular/core';
import {Action} from '@ngrx/store';
import { Observable } from 'rxjs/rx';
import { IAssociation } from '../models';


// typage a faire
@Injectable()
export class AssociationActions {

     static LOAD_ASSOCIATIONS = '[Association] Load Associations';
     static LOAD_ASSOCIATIONS_SUCCESS = '[Association] Load Associations Success';
     static API_ASSOCIATION_FAILED = '[Association Error] Error on Association';
     static GET_ASSOCIATION = '[Association] Get Association';
     static GET_ASSOCIATION_SUCCESS = '[Association] Get Association Success';
     static RESET_BLANK_ASSOCIATION = '[Association] Reset Blank Association';
      static RESET_BLANK_ERROR = '[Association Error] Reset Blank ERROR';
     static SAVE_ASSOCIATION = '[Association] Save Association';
     static SAVE_ASSOCIATION_SUCCESS = '[Association] Save Association Success';
    static ADD_ASSOCIATION = '[Association] Add Association';
    static ADD_ASSOCIATION_SUCCESS = '[Association] Add Association Success';
    static DELETE_ASSOCIATION = '[Association] Delete Association';
    static DELETE_ASSOCIATION_SUCCESS = '[Association] Delete Association Success';

    loadAssociations(): Action {
        return {
            type: AssociationActions.LOAD_ASSOCIATIONS
        };
    }

    loadAssociationsSuccess(associations: IAssociation[]): Action {
        return {
            type: AssociationActions.LOAD_ASSOCIATIONS_SUCCESS,
            payload: associations
        };
    }

    getAssociationError(error: any): Action {
        return {
            type: AssociationActions.API_ASSOCIATION_FAILED,
            payload: error
        };
    }
    getAssociation(id): Action {
        return {
            type: AssociationActions.GET_ASSOCIATION,
            payload: id
        };
    }

    getAssociationSuccess(association): Action {
        return {
            type: AssociationActions.GET_ASSOCIATION_SUCCESS,
            payload: association
        };
    }


    resetBlankAssociation(idUser:string): Action {
        return {
            type: AssociationActions.RESET_BLANK_ASSOCIATION,
            payload : idUser
        };
    }
    resetBlankError(): Action {
        return {
            type: AssociationActions.RESET_BLANK_ERROR
        };
    }
    saveAssociation(association): Action {
        return {
            type: AssociationActions.SAVE_ASSOCIATION,
            payload: association
        };
    }

    saveAssociationSuccess(association): Action {
        return {
            type: AssociationActions.SAVE_ASSOCIATION_SUCCESS,
            payload: association
        };
    }


    addAssociation(association): Action {
        return {
            type: AssociationActions.ADD_ASSOCIATION,
            payload: association
        };
    }

    addAssociationSuccess(association): Action {
        return {
            type: AssociationActions.ADD_ASSOCIATION_SUCCESS,
            payload: association
        };
    }


    deleteAssociation(association): Action {
        return {
            type: AssociationActions.DELETE_ASSOCIATION,
            payload: association
        };
    }

    deleteAssociationSuccess(association): Action {
        return {
            type: AssociationActions.DELETE_ASSOCIATION_SUCCESS,
            payload: association
        };
    }


}
