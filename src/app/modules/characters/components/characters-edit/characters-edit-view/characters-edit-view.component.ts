import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'sl-characters-edit-view',
  templateUrl: './characters-edit-view.component.html',
  styleUrls: ['./characters-edit-view.component.scss']
})
export class CharactersEditViewComponent implements OnInit {
  @Input() public species: string[];

  public characterForm: FormGroup;
  public genders: string[];

  constructor() {
  }

  public ngOnInit(): void {
    this.genders = ['n/a', 'male', 'female'];
    this.createForm();
  }

  public createForm(): void {
    this.characterForm = new FormGroup({
      name: new FormControl(),
      gender: new FormControl(),
      species: new FormControl(),
      homeworld: new FormControl(),
    });
  }

}
