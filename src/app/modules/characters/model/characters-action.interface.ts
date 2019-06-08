import {CharactersActionTypes} from '../state/characters.actions';

export interface CharactersActionInterface {
  payload: any;
  type: CharactersActionTypes;
}
