import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sl-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() public numberOfAllPages = 1;
  @Output() public pageLoad: EventEmitter<number> = new EventEmitter<number>();

  public activePageNumber: number;

  constructor() {
  }

  public ngOnInit(): void {
    this.activePageNumber = 1;
  }

  public getPages(): number[] {
    if (!this.numberOfAllPages || this.numberOfAllPages < 2) {
      return [1];
    }
    if (this.activePageNumber === 1) {
      return [1, 2];
    }

    return [this.activePageNumber - 1, this.activePageNumber];
  }

  public loadPage(pageNumber: number): void {
    this.pageLoad.emit(pageNumber);
  }

  public loadPreviousPage(): void {
    if (this.activePageNumber > 1) {
      this.loadPage(this.activePageNumber - 1);
    }
  }

  public loadNextPage() {
    if (this.activePageNumber < this.numberOfAllPages) {
      this.loadPage(this.activePageNumber + 1);
    }
  }
}
