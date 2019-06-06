import {CharacterModel} from './character.model';

export interface CharactersStateInterface {
  characters: CharacterModel[];
  editedCharacter: CharacterModel;
  searchText: string;
  lastPageNumber: number;
  activePageNumber: number;
}
