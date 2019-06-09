import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SortParamsInterface} from '../../../../model/sort-params.interface';

@Component({
  selector: 'sl-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() public rows: any[];
  @Input() public columns: string[];
  @Input() public sortParams: SortParamsInterface;

  @Output() public removeElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() public editElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() public sort: EventEmitter<SortParamsInterface> = new EventEmitter<SortParamsInterface>();

  constructor() {
  }

  public onRemoveElement(model) {
    this.removeElement.emit(model.id);
  }

  public onEditElement(model) {
    this.editElement.emit(model.id);
  }

  public onSort(column: string) {
    let newSortParams: SortParamsInterface = {...this.sortParams};
    if (this.sortParams && this.sortParams.column === column) {
      newSortParams.order = this.toggleOrder(this.sortParams.order);
    } else {
      newSortParams = {column, order: 'asc'};
    }
    this.sort.emit(newSortParams);
  }

  public toggleOrder(order: string): string {
    return order === 'desc' ? 'asc' : 'desc';
  }
}
