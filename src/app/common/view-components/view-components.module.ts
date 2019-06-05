import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './components/search/search.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {DataTableComponent} from './components/data-table/data-table.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {RouterModule} from '@angular/router';

const COMPONENTS = [
  ListViewComponent,
  SearchComponent,
  DataTableComponent,
  PaginationComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ViewComponentsModule {
}
