import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display search input', () => {
    const input = fixture.debugElement.query(By.css('#searchInput'));

    expect(input).toBeTruthy();
  });

  it('should emit event on input value change', fakeAsync(() => {
    spyOn(component.searchTextChange, 'emit');
    const input: HTMLInputElement = <HTMLInputElement>fixture.nativeElement.querySelector('input');
    const testInputValue = 'test';
    input.value = testInputValue;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(200);

    expect(component.searchTextChange.emit).toHaveBeenCalledWith(testInputValue);
  }));
});
