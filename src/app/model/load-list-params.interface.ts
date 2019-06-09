import {SortParamsInterface} from './sort-params.interface';

export interface LoadListParamsInterface {
  searchText: string;
  activePage: number;
  sortParams?: SortParamsInterface;
}
