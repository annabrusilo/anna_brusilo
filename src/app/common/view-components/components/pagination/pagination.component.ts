import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginationDataModel} from '../../../../model/pagination-data.model';

@Component({
  selector: 'sl-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() public pagination: PaginationDataModel = new PaginationDataModel();
  @Output() public selectPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  public getPages(): number[] {
    if (!this.pagination.lastPage || this.pagination.lastPage < 2) {
      return [1];
    }
    if (this.pagination.activePage === this.pagination.lastPage) {
      return [this.pagination.activePage - 1, this.pagination.activePage];
    }

    return [this.pagination.activePage, this.pagination.activePage + 1];
  }

  public onSelectPage(pageNumber: number): void {
    this.selectPage.emit(pageNumber);
  }

  public selectPreviousPage(): void {
    if (this.pagination.activePage > 1) {
      this.onSelectPage(this.pagination.activePage - 1);
    }
  }

  public selectNextPage() {
    if (this.pagination.activePage < this.pagination.lastPage) {
      this.onSelectPage(this.pagination.activePage + 1);
    }
  }
}
