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
import {CharactersFacadeService} from './services/characters-facade.service';
import { CharactersEditViewComponent } from './components/characters-edit/characters-edit-view/characters-edit-view.component';
import {FocusOnFirstInvalidElementDirective} from '../../directives/focus-on-first-invalid-element.directive';

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
    CharactersEditViewComponent,
    FocusOnFirstInvalidElementDirective,
  ],
  providers: [
    CharactersFacadeService,
    CharactersService,
  ]
})
export class CharactersModule {
}
