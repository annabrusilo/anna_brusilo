import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CharactersService} from './characters.service';
import {CharactersStateInterface} from '../model/characters-state.interface';
import {reducer} from '../state/characters.reducer';
import {CharacterModel} from '../model/character.model';
import {distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {CharactersResponseInterface} from '../model/characters-response.interface';
import {PaginationDataModel} from '../model/pagination-data.model';

@Injectable()
export class CharactersFacadeService {
  public characters$: Observable<CharacterModel[]>;
  public pagination$: Observable<PaginationDataModel>;
  public updateCharacters$: Observable<CharactersResponseInterface>;

  private state: CharactersStateInterface = {
    characters: [],
    editedCharacter: null,
    searchText: '',
    pagination: new PaginationDataModel(),
  };

  private dispatch: BehaviorSubject<CharactersStateInterface> = new BehaviorSubject<CharactersStateInterface>(this.state);

  constructor(private charactersService: CharactersService) {
  this.prepareSelectors();

    this.updateCharacters$ = this.dispatch
      .pipe(
        distinctUntilChanged((prevState: CharactersStateInterface, currState: CharactersStateInterface) =>
          prevState.searchText === currState.searchText && prevState.pagination.activePage === currState.pagination.activePage
        ),
      ).pipe(
        switchMap((state: CharactersStateInterface) => {
          return this.charactersService.getCharacters(state.pagination.activePage, state.searchText);
        })
      );

    this.updateCharacters$.subscribe((charactersResponse: CharactersResponseInterface) => {
      const newState = reducer(this.state, {type: CharactersActionTypes.LOAD_CHARACTERS_LIST, payload: charactersResponse});
      this.dispatch.next(this.state = newState);
    });

  }

  public prepareSelectors(): void {
    this.characters$ = this.dispatch
      .asObservable()
      .pipe(
        map((state: CharactersStateInterface): CharacterModel[] => state.characters),
        distinctUntilChanged(),
        startWith([])
      );

    this.pagination$ = this.dispatch
      .asObservable()
      .pipe(
        map((state: CharactersStateInterface): PaginationDataModel => state.pagination),
        distinctUntilChanged(),
        startWith([])
      );

  }
  public loadPage(pageNumber: number) {
    const newState = reducer(this.state, {type: CharactersActionTypes.SET_SELECTED_PAGE, payload: pageNumber});
    this.dispatch.next(this.state = newState);
  }

  public searchByText(searchText: string) {
    const newState = reducer(this.state, {type: CharactersActionTypes.SET_SEARCH_TEXT, payload: searchText});
    this.dispatch.next(this.state = newState);
  }

}
