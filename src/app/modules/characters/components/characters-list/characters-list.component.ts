import { Component, OnInit } from '@angular/core';
import {CharactersService} from '../../services/characters.service';

@Component({
  selector: 'sl-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  constructor(private service: CharactersService) { }

  public ngOnInit() {
    this.service.getCharacters()
      .subscribe((characters) => console.log('characters', characters));
  }
}
