import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationDataModel} from '../../../../model/pagination-data.model';
import {SortParamsInterface} from '../../../../model/sort-params.interface';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  @Input() public data: any[];
  @Input() public columns: string[];
  public pagination: PaginationDataModel;
  @Input('pagination')
  public set handlePaginationChange(data: PaginationDataModel) {
    this.pagination = data || new PaginationDataModel();
    if (data && data.activePage > data.lastPage && data.lastPage) {
      this.onSelectPage(data.lastPage);
    }
  }
  @Input() public sortParams: SortParamsInterface;

  @Output() public selectPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() public searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() public removeElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() public editElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() public sort: EventEmitter<SortParamsInterface> = new EventEmitter<SortParamsInterface>();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public onSelectPage(pageNumber: number): void {
    this.selectPage.emit(pageNumber);
  }

  public onSearchTextChange(searchText: string): void {
    this.searchTextChange.emit(searchText);
  }

  public onRemoveElement(id: number): void {
    this.removeElement.emit(id);
  }

  public onEditElement(id: number) {
    this.editElement.emit(id);
  }

  public onSort(sortParams: SortParamsInterface) {
    this.sort.emit(sortParams);
  }
}
