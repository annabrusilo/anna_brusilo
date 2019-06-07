import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CharacterModel} from '../model/character.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CharactersResponseInterface} from '../model/characters-response.interface';

@Injectable()
export class CharactersService {
  constructor(private http: HttpClient) {
  }

  public getCharacters(pageNumber: number = 1, searchText: string): Observable<CharactersResponseInterface> {
    return this.http.get<CharacterModel[]>(`${environment.apiUrl}/characters`, {
      params: {_page: pageNumber, q: searchText},
      observe: 'response'
    })
      .pipe(
        map((response: HttpResponse): CharactersResponseInterface => ({
          characters: response.body,
          lastPageNumber: Math.ceil(response.headers.get('X-Total-Count') / 10),
        }))
      );
  }

  public saveCharacter(payload: CharacterModel) {
    if (payload && payload.id) {
      return this.updateCharacter(payload);
    } else {
      return this.createCharacter(payload);
    }
  }

  public updateCharacter(payload: CharacterModel) {
    this.http.put(`${environment.apiUrl}/characters`, payload);
  }

  public createCharacter(payload: CharacterModel) {
    this.http.post(`${environment.apiUrl}/characters`, payload);
  }
}
