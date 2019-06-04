import { Component, OnInit } from '@angular/core';
import {CharactersService} from '../../services/characters.service';

@Component({
  selector: 'sl-characters-edit',
  templateUrl: './characters-edit.component.html',
  styleUrls: ['./characters-edit.component.scss']
})
export class CharactersEditComponent implements OnInit {

  constructor(private service: CharactersService) { }

  ngOnInit() {
    this.service.getCharacters();
  }

}
