import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CharacterModel} from '../model/character.model';
import {Observable} from 'rxjs';

@Injectable()
export class CharactersService {
  constructor(private http: HttpClient) {
  }

  public getCharacters(pageNumber: number = 1): Observable<CharacterModel[]> {
    return this.http.get<CharacterModel[]>(`${environment.apiUrl}/characters?_page=${pageNumber}`);
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
