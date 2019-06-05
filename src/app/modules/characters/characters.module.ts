import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersEditComponent} from './components/characters-edit/characters-edit.component';
import {CharactersListComponent} from './components/characters-list/characters-list.component';
import {ViewComponentsModule} from '../../common/view-components/view-components.module';
import {CharactersMainComponent} from './characters-main.component';
import {CharactersService} from './services/characters.service';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CharactersRoutingModule,
    ViewComponentsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CharactersMainComponent,
    CharactersEditComponent,
    CharactersListComponent,
  ],
  providers: [
    CharactersService,
  ]
})
export class CharactersModule {
}
