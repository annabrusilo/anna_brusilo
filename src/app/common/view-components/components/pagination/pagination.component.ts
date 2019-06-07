import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationDataModel} from '../../../../modules/characters/model/pagination-data.model';

@Component({
  selector: 'sl-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() public pagination: PaginationDataModel = new PaginationDataModel();
  @Output() public pageLoad: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public getPages(): number[] {
    if (!this.pagination.lastPage || this.pagination.lastPage < 2) {
      return [1];
    }
    if (this.pagination.activePage === 1) {
      return [1, 2];
    }

    return [this.pagination.activePage - 1, this.pagination.activePage];
  }

  public loadPage(pageNumber: number): void {
    this.pageLoad.emit(pageNumber);
  }

  public loadPreviousPage(): void {
    if (this.pagination.activePage > 1) {
      this.loadPage(this.pagination.activePage - 1);
    }
  }

  public loadNextPage() {
    if (this.pagination.activePage < this.pagination.lastPage) {
      this.loadPage(this.pagination.activePage + 1);
    }
  }
}
