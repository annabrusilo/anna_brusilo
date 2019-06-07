import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {debounceTime} from 'rxjs/internal/operators';

@Component({
  selector: 'sl-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() public searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  public searchTextControl:  FormControl;
  private subscribe = true;

  constructor() { }

  public ngOnInit(): void {
    this.searchTextControl = new FormControl();
    this.subscribeToSearchTextChange();
  }

  public subscribeToSearchTextChange(): void {
    this.searchTextControl.valueChanges
      .pipe(
        takeWhile(() => this.subscribe),
        debounceTime(200),
      )
      .subscribe((searchText) =>
        this.searchTextChange.emit(searchText),
      );
  }

  public ngOnDestroy(): void {
    this.subscribe = false;
  }

}
