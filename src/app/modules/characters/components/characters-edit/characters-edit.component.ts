import {Component, OnInit} from '@angular/core';
import {CharactersFacadeService} from '../../services/characters-facade.service';

@Component({
  selector: 'sl-characters-edit',
  templateUrl: './characters-edit.component.html',
  styleUrls: ['./characters-edit.component.scss']
})
export class CharactersEditComponent implements OnInit {

  constructor(private service: CharactersFacadeService) { }

  public ngOnInit(): void {
    this.service.loadSpecies();
  }

}
