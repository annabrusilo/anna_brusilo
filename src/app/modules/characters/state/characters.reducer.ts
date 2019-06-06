import {CharactersStateInterface} from '../model/characters-state.interface';
import {CharactersActionInterface} from '../model/characters-action.interface';

export function reducer(state: CharactersStateInterface, action: CharactersActionInterface): CharactersStateInterface {
  switch (action.type) {
    case CharactersActionTypes.SET_LAST_PAGE_NUMBER: {
      return {...state, lastPageNumber: action.payload};
    }
    case CharactersActionTypes.SET_SEARCH_TEXT: {
      return {...state, searchText: action.payload};
    }
    case CharactersActionTypes.SET_SELECTED_PAGE: {
      return {...state, activePageNumber: action.payload};
    }
    case CharactersActionTypes.LOAD_CHARACTERS_LIST: {
      return {...state, characters: action.payload};
    }
    return state;
  }
}
