import {Component, OnInit} from '@angular/core';
import {CharacterModel} from '../../model/character.model';
import {CharactersFacadeService} from '../../services/characters-facade.service';

@Component({
  selector: 'sl-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  public columns: string[];

  constructor(public service: CharactersFacadeService) {
  }

  public ngOnInit() {
    this.columns = Object.keys(new CharacterModel());
    this.service.loadPage(1);
  }

  public handlePageLoad(pageNumber: number): void {
    this.service.loadPage(pageNumber);
  }

  public handleSearchTextChange(searchText: string): void {
    this.service.searchByText(searchText);
  }
}
