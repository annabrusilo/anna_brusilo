import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CharacterModel} from '../model/character.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CharactersResponseInterface} from '../model/characters-response.interface';
import {LoadListParamsInterface} from '../../../model/load-list-params.interface';

@Injectable()
export class CharactersService {
  constructor(private http: HttpClient) {
  }

  public getCharacters(params: LoadListParamsInterface): Observable<CharactersResponseInterface> {
    const requestParams = {_page: params.activePage.toString(), q: params.searchText};
    if (params.sortParams) {
      requestParams['_sort'] = params.sortParams.column;
      requestParams['_order'] = params.sortParams.order;
    }
    return this.http.get<CharacterModel[]>(`${environment.apiUrl}/characters`, {
      params: requestParams,
      observe: 'response'
    })
      .pipe(
        map((response: HttpResponse<CharacterModel[]>): CharactersResponseInterface => ({
          characters: response.body,
          lastPageNumber: Math.ceil(+response.headers.get('X-Total-Count') / 10),
        }))
      );
  }

  public getCharacter(id: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${environment.apiUrl}/characters/${id}`);
  }

  public saveCharacter(payload: CharacterModel) {
    if (payload && payload.id) {
      return this.updateCharacter(payload);
    } else {
      return this.createCharacter(payload);
    }
  }

  public updateCharacter(payload: CharacterModel): Observable<CharacterModel> {
    return this.http.put<CharacterModel>(`${environment.apiUrl}/characters/${payload.id}`, payload);
  }

  public createCharacter(payload: CharacterModel): Observable<CharacterModel> {
    return this.http.post<CharacterModel>(`${environment.apiUrl}/characters`, payload);
  }

  public delete(id: number): Observable<{}> {
    return this.http.delete(`${environment.apiUrl}/characters/${id}`);
  }


  public getSpecies(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/species`);
  }
}
