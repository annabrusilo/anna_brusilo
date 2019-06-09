import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterModel} from '../../../model/character.model';

@Component({
  selector: 'sl-characters-edit-view',
  templateUrl: './characters-edit-view.component.html',
  styleUrls: ['./characters-edit-view.component.scss']
})
export class CharactersEditViewComponent implements OnInit {
  @Input() set editedCharacter(data: CharacterModel) {
    if (this.characterForm) {
      this.characterForm.reset(data);
    }
  }
  @Input() public species: string[];
  @Output() public saveCharacter: EventEmitter<CharacterModel> = new EventEmitter<CharacterModel>();

  public characterForm: FormGroup;
  public genders: string[];
  public submitted = false;
  public savingInProgress = false;

  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.genders = ['n/a', 'male', 'female'];
    this.createForm();
  }

  public createForm(): void {
    this.characterForm = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      gender: ['', Validators.required],
      species: ['', Validators.required],
      homeworld: '',
    });
  }

  public onSave(): void {
    this.submitted = true;

    if (this.characterForm.valid) {
      this.savingInProgress = true;
      this.saveCharacter.emit(new CharacterModel(this.characterForm.value));
    }
  }

  public get controls() {
    return this.characterForm.controls;
  }
}
