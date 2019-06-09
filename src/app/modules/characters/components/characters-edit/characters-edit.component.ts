import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CharactersFacadeService} from '../../services/characters-facade.service';
import {CharacterModel} from '../../model/character.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CharactersEditViewComponent} from './characters-edit-view/characters-edit-view.component';
import {filter, map, switchMap, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'sl-characters-edit',
  templateUrl: './characters-edit.component.html',
  styleUrls: ['./characters-edit.component.scss']
})
export class CharactersEditComponent implements OnInit, OnDestroy {
  @ViewChild('editView') editView: CharactersEditViewComponent;
  public editedCharacter: CharacterModel = null;
  public subscribe = true;

  constructor(private service: CharactersFacadeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.service.loadSpecies();
    this.loadEditedCharacter();
  }

  public ngOnDestroy(): void {
    this.subscribe = false;
  }

  public saveCharacter(event: CharacterModel) {
    this.service.saveCharacter(event)
      .pipe(takeWhile(() => this.subscribe))
      .subscribe(
        () => {
          this.router.navigate(['list']);
        },
        (error) => {
          alert('Error while saving character!');
          this.editView.savingInProgress = false;
        });
  }

  private loadEditedCharacter(): void {
    this.route.params.pipe(
      takeWhile(() => this.subscribe),
      filter((params: Params) => params.hasOwnProperty('id')),
      map((params) => params.id),
      switchMap((id: number) => this.service.loadCharacter(id)
      ))
      .subscribe((character) => {
          this.editedCharacter = character;
        },
        (error) => {
          alert('Error while loading character!');
        });
  }
}
