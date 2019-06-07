import {CharacterModel} from './character.model';

export interface CharactersResponseInterface {
  characters: CharacterModel[];
  lastPageNumber: number;
}
