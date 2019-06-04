import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharactersMainComponent} from './characters-main.component';
import {CharactersEditComponent} from './components/characters-edit/characters-edit.component';
import {CharactersListComponent} from './components/characters-list/characters-list.component';

const routes: Routes = [{
  path: '',
  component: CharactersMainComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  }, {
    path: 'list',
    component: CharactersListComponent,
  }, {
    path: 'edit',
    component: CharactersEditComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CharactersRoutingModule {
}
