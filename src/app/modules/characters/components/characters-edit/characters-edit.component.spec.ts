import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharactersEditComponent} from './characters-edit.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CharactersFacadeService} from '../../services/characters-facade.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('CharactersEditComponent', () => {
  let component: CharactersEditComponent;
  let fixture: ComponentFixture<CharactersEditComponent>;

  const mockedFacadeService = {
    setLoadListParams(): void {},
    loadSpecies(): void {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersEditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [{provide: CharactersFacadeService, useValue: mockedFacadeService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
