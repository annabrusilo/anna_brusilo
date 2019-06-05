import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sl-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() public rows: any[];
  @Input() public columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
