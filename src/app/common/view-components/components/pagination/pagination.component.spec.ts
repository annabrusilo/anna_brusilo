import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {By} from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display previous and next navigation elements', () => {
    const paginationElements = fixture.debugElement.queryAll(By.css('li.page-item'));
    const previousElement = paginationElements && paginationElements[0];
    const nextElement = paginationElements && paginationElements[paginationElements.length - 1];

    expect(previousElement.nativeElement.innerHTML).toContain('Previous');
    expect(nextElement.nativeElement.innerHTML).toContain('Next');
  });

  it('should call method when previous button clicked', () => {
    spyOn(component, 'selectPreviousPage');
    const paginationElements = fixture.debugElement.queryAll(By.css('li.page-item'));
    const clickablePreviousElement = paginationElements && paginationElements[0] && paginationElements[0].query(By.css('a'));
    clickablePreviousElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.selectPreviousPage).toHaveBeenCalled();
  });

  it('should call method when next button clicked', () => {
    spyOn(component, 'selectNextPage');
    const paginationElements = fixture.debugElement.queryAll(By.css('li.page-item'));
    const clickableNextElement = paginationElements
      && paginationElements[paginationElements.length - 1]
      && paginationElements[paginationElements.length - 1].query(By.css('a'));
    clickableNextElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.selectNextPage).toHaveBeenCalled();
  });

  it('should display 1 page navigation element when lastPage=1', () => {
    component.pagination = {lastPage: 1, activePage: 1};
    fixture.detectChanges();
    const paginationElements = fixture.debugElement.queryAll(By.css('li.page-item'));
    const pages = paginationElements.slice(1, paginationElements.length - 1);

    expect(pages.length).toBe(1);
    expect(pages[0].nativeElement.innerHTML).toContain(1);
  });

  it('should display current and next page navigation elements for activePage < lastPage', () => {
    component.pagination = {lastPage: 10, activePage: 4};
    fixture.detectChanges();
    const paginationElements = fixture.debugElement.queryAll(By.css('li.page-item'));
    const pages = paginationElements.slice(1, paginationElements.length - 1);

    expect(pages.length).toBe(2);
    expect(pages[0].nativeElement.innerHTML).toContain(4);
    expect(pages[1].nativeElement.innerHTML).toContain(5);
  });

  it('should display current and previous page navigation elements for activePage === lastPage', () => {
    component.pagination = {lastPage: 8, activePage: 8};
    fixture.detectChanges();
    const paginationElements = fixture.debugElement.queryAll(By.css('li.page-item'));
    const pages = paginationElements.slice(1, paginationElements.length - 1);

    expect(pages.length).toBe(2);
    expect(pages[0].nativeElement.innerHTML).toContain(7);
    expect(pages[1].nativeElement.innerHTML).toContain(8);
  });

  it('should mark selected page navigation element as active', () => {
    component.pagination = {lastPage: 7, activePage: 5};
    fixture.detectChanges();
    const paginationElements = fixture.debugElement.queryAll(By.css('li.page-item'));
    const pages = paginationElements.slice(1, paginationElements.length - 1);
    const activeElement = pages[0];

    expect(activeElement.nativeElement.classList.contains('active')).toBeTruthy();
  });
});
