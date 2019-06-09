import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersEditViewComponent } from './characters-edit-view.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('CharactersEditViewComponent', () => {
  let component: CharactersEditViewComponent;
  let fixture: ComponentFixture<CharactersEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersEditViewComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
