import { Component, OnInit } from '@angular/core';
import {CharactersService} from '../../services/characters.service';
import {CharacterModel} from '../../model/character.model';

@Component({
  selector: 'sl-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  public characters: CharacterModel[];
  public columns: string[];

  constructor(private service: CharactersService) { }

  public ngOnInit() {
    this.columns = Object.keys(new CharacterModel());
    this.service.getCharacters()
      .subscribe((characters) => {
        this.characters = characters;
      });
  }

  public handlePageLoad(pageNumber: number): void {
    // TODO implement
  }
}
