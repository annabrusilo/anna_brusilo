import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharactersListComponent} from './characters-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CharactersFacadeService} from '../../services/characters-facade.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  const mockedFacadeService = {
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [{provide: CharactersFacadeService, useValue: mockedFacadeService}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
