import {CharactersStateInterface} from '../model/characters-state.interface';
import {CharactersActionInterface} from '../model/characters-action.interface';

export function reducer(state: CharactersStateInterface, action: CharactersActionInterface): CharactersStateInterface {
  switch (action.type) {
    case CharactersActionTypes.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload,
        pagination: {...state.pagination, activePage: 1}
      };
    }
    case CharactersActionTypes.SET_SELECTED_PAGE: {
      return {
        ...state,
        pagination: {... state.pagination, activePage: action.payload}
      };
    }
    case CharactersActionTypes.LOAD_CHARACTERS_LIST: {
      return {
        ...state,
        characters: action.payload.characters,
        pagination: {...state.pagination, lastPage: action.payload.lastPageNumber},
      };
    }
    return state;
  }
}
