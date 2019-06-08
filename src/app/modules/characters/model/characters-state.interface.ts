import {CharacterModel} from './character.model';
import {PaginationDataModel} from './pagination-data.model';

export interface CharactersStateInterface {
  characters: CharacterModel[];
  editedCharacter: CharacterModel;
  searchText: string;
  pagination: PaginationDataModel;
  species: string[];
}
