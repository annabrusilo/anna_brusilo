import {CharacterModel} from './character.model';
import {PaginationDataModel} from '../../../model/pagination-data.model';
import {SortParamsInterface} from '../../../model/sort-params.interface';

export interface CharactersStateInterface {
  characters: CharacterModel[];
  searchText: string;
  pagination: PaginationDataModel;
  sortParams: SortParamsInterface;
  species: string[];
}
