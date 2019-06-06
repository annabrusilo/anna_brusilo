import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CharactersService} from './characters.service';
import {CharactersStateInterface} from '../model/characters-state.interface';
import {reducer} from '../state/characters.reducer';
import {CharacterModel} from '../model/character.model';
import {distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';

@Injectable()
export class CharactersFacadeService {
  public characters$: Observable<CharacterModel[]>;
  public updateCharacters$: Observable<CharacterModel[]>;

  private state: CharactersStateInterface = {
    characters: [],
    editedCharacter: null,
    searchText: '',
    lastPageNumber: null,
    activePageNumber: null,
  };

  private dispatch: BehaviorSubject = new BehaviorSubject<CharactersStateInterface>(this.state);

  constructor(private charactersService: CharactersService) {
    this.characters$ = this.dispatch
      .asObservable()
      .pipe(
        map((state: CharactersStateInterface) => state.characters),
        distinctUntilChanged(),
        startWith([])
      );


    this.updateCharacters$ = this.dispatch
      .pipe(
        distinctUntilChanged((prevState: CharactersStateInterface, currState: CharactersStateInterface) =>
          prevState.searchText === currState.searchText && prevState.activePageNumber === currState.activePageNumber
        ),
      ).pipe(
        switchMap((state: CharactersStateInterface) => {
          return this.charactersService.getCharacters(state.activePageNumber);
        })
      );

    this.updateCharacters$.subscribe((characters: CharacterModel[]) => {
      const newState = reducer(this.state, {type: CharactersActionTypes.LOAD_CHARACTERS_LIST, payload: characters});
      this.dispatch.next(this.state = newState);
    });

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
