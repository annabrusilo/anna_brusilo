import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {CharactersService} from './characters.service';
import {CharactersStateInterface} from '../model/characters-state.interface';
import {reducer} from '../state/characters.reducer';
import {CharacterModel} from '../model/character.model';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap, withLatestFrom} from 'rxjs/operators';
import {CharactersResponseInterface} from '../model/characters-response.interface';
import {PaginationDataModel} from '../../../model/pagination-data.model';
import {CharactersActionTypes} from '../state/characters.actions';
import {LoadListParamsInterface} from '../../../model/load-list-params.interface';
import {SortParamsInterface} from '../../../model/sort-params.interface';

@Injectable()
export class CharactersFacadeService {
  public getCharacters$: Observable<CharacterModel[]>;
  public getPagination$: Observable<PaginationDataModel>;
  public getSortParams$: Observable<SortParamsInterface>;
  public getSpecies$: Observable<string[]>;

  private loadCharactersStream$: Observable<CharactersResponseInterface>;
  private loadSpeciesStream$: Observable<string[]>;

  private state: CharactersStateInterface = {
    characters: [],
    searchText: '',
    pagination: new PaginationDataModel(),
    species: [],
    sortParams: null,
  };

  private dispatch: BehaviorSubject<CharactersStateInterface> = new BehaviorSubject<CharactersStateInterface>(this.state);
  private getSpeciesAction: Subject<void> = new Subject<void>();
  private reloadForParamsAction: Subject<LoadListParamsInterface> = new Subject<LoadListParamsInterface>();
  private removeCharacterAction: Subject<number> = new Subject<number>();

  constructor(private charactersService: CharactersService) {
    this.prepareSelectors();
    this.prepareStreams();
  }

  public setLoadListParams(params: LoadListParamsInterface): void {
    const newState = reducer(this.state, {type: CharactersActionTypes.SET_LOAD_LIST_PARAMS, payload: params});
    this.dispatch.next(this.state = newState);
    this.reloadForParamsAction.next();
  }

  public selectPage(pageNumber: number): void {
    const newState = reducer(this.state, {type: CharactersActionTypes.SET_SELECTED_PAGE, payload: pageNumber});
    this.dispatch.next(this.state = newState);
  }

  public searchByText(searchText: string): void {
    const newState = reducer(this.state, {type: CharactersActionTypes.SET_SEARCH_TEXT, payload: searchText});
    this.dispatch.next(this.state = newState);
  }

  public sortByColumn(sortParams: SortParamsInterface): void {
    const newState = reducer(this.state, {type: CharactersActionTypes.SET_SORT_PARAMS, payload: sortParams});
    this.dispatch.next(this.state = newState);
  }

  public loadSpecies(): void {
    this.getSpeciesAction.next();
  }

  public removeCharacter(id: number): void {
    this.removeCharacterAction.next(id);
  }

  public saveCharacter(model: CharacterModel): Observable<CharacterModel> {
    return this.charactersService.saveCharacter(model);
  }

  public loadCharacter(id: number): Observable<CharacterModel> {
    return this.charactersService.getCharacter(id);
  }

  private prepareSelectors(): void {
    this.getCharacters$ = this.dispatch.asObservable()
      .pipe(
        map((state: CharactersStateInterface): CharacterModel[] => state.characters),
        distinctUntilChanged(),
        startWith([])
      );

    this.getPagination$ = this.dispatch.asObservable()
      .pipe(
        map((state: CharactersStateInterface): PaginationDataModel => state.pagination),
        distinctUntilChanged(),
        startWith(new PaginationDataModel())
      );

    this.getSpecies$ = this.dispatch.asObservable()
      .pipe(
        map((state: CharactersStateInterface): string[] => state.species),
        distinctUntilChanged(),
        startWith(new Array<string>())
      );

    this.getSortParams$ = this.dispatch.asObservable()
      .pipe(
        map((state: CharactersStateInterface): SortParamsInterface => state.sortParams),
        distinctUntilChanged(),
        startWith(null)
      );
  }

  private prepareStreams(): void {
    this.prepareCharactersStream();
    this.prepareSpeciesStream();
  }

  private prepareCharactersStream(): void {
    const loadListParamsChanged$: Observable<CharactersStateInterface> = this.dispatch
      .pipe(
        distinctUntilChanged((prevState: CharactersStateInterface, currState: CharactersStateInterface) =>
          prevState.searchText === currState.searchText && prevState.pagination.activePage === currState.pagination.activePage
          && prevState.sortParams === currState.sortParams
        ),
      );

    const removeCharacter$: Observable<{}> = this.removeCharacterAction.asObservable()
      .pipe(
        switchMap((id: number) => {
          return this.charactersService.delete(id);
        })
      );

    const reloadForParams$: Observable<LoadListParamsInterface> = this.reloadForParamsAction.asObservable();

    this.loadCharactersStream$ = merge(
      removeCharacter$,
      loadListParamsChanged$,
      reloadForParams$
    ).pipe(
      withLatestFrom(this.dispatch),
      debounceTime(100),
      switchMap(([action, state]: [CharactersStateInterface | {} | LoadListParamsInterface, CharactersStateInterface])
        : Observable<CharactersResponseInterface> => {
        return this.charactersService.getCharacters({
          activePage: state.pagination.activePage,
          searchText: state.searchText,
          sortParams: state.sortParams,
        });
      })
    );

    this.loadCharactersStream$.subscribe((charactersResponse: CharactersResponseInterface) => {
      const newState = reducer(this.state, {type: CharactersActionTypes.LOAD_CHARACTERS_LIST, payload: charactersResponse});
      this.dispatch.next(this.state = newState);
    });
  }

  public prepareSpeciesStream(): void {
    this.loadSpeciesStream$ = this.getSpeciesAction.asObservable()
      .pipe(
        switchMap(() => {
          return this.charactersService.getSpecies();
        })
      );

    this.loadSpeciesStream$.subscribe((species: string[]) => {
      const newState = reducer(this.state, {type: CharactersActionTypes.LOAD_SPECIES_LIST, payload: species});
      this.dispatch.next(this.state = newState);
    });
  }
}
