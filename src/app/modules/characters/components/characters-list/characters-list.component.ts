import {Component, OnInit} from '@angular/core';
import {CharacterModel} from '../../model/character.model';
import {CharactersFacadeService} from '../../services/characters-facade.service';
import {Router} from '@angular/router';
import {SortParamsInterface} from '../../../../model/sort-params.interface';

@Component({
  selector: 'sl-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  public columns: string[];

  constructor(public service: CharactersFacadeService, private router: Router) {
  }

  public ngOnInit() {
    this.service.setLoadListParams({searchText: '', activePage: 1});
    this.columns = Object.keys(new CharacterModel());
  }

  public onSelectPage(pageNumber: number): void {
    this.service.selectPage(pageNumber);
  }

  public onSearchTextChange(searchText: string): void {
    this.service.searchByText(searchText);
  }

  public onRemoveElement(id: number) {
    this.service.removeCharacter(id);
  }

  public onEditElement(id: number ) {
    this.router.navigate(['edit', id]);
  }

  public onSort(sortParams: SortParamsInterface) {
    this.service.sortByColumn(sortParams);
  }
}
