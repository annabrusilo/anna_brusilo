import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  @Input() public data: any[];
  @Input() public columns: string[];

  @Output() public pageLoad: EventEmitter<number> = new EventEmitter<number>();
  @Output() public searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  public ngOnInit(): void {}

  public handlePageLoad(pageNumber: number): void {
    this.pageLoad.emit(pageNumber);
  }

  public handleSearchTextChange(searchText: string): void {
    this.searchTextChange.emit(searchText);
  }
}
