import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataTableComponent} from './data-table.component';
import {By} from '@angular/platform-browser';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let mockColumns: string[];
  let mockRows: any[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockColumns = ['col1', 'col2', 'col3', 'col4'];
    mockRows = [
      {col1: 'value11', col2: 'value12', col3: 'value13', col4: 'value14'},
      {col1: 'value21', col2: 'value22', col3: 'value23', col4: 'value24'},
      {col1: 'value31', col2: 'value32', col3: 'value33', col4: 'value34'},
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display passed column headers', () => {
    component.columns = mockColumns;
    component.rows = mockRows;
    fixture.detectChanges();

    const columnHeaders = fixture.debugElement.queryAll(By.css('thead tr th'));
    const columnHeaderLabels = (columnHeaders || []).map((header) => header.nativeElement.innerText);

    const everyColumnDisplayed = mockColumns.every((column) => columnHeaderLabels
      .find((label) => label.toLowerCase() === column.toLowerCase())
    );

    expect(everyColumnDisplayed).toBeTruthy();
  });

  it('should display Actions column header', () => {
    component.columns = mockColumns;
    component.rows = mockRows;
    fixture.detectChanges();

    const columnHeaders = fixture.debugElement.queryAll(By.css('thead tr th'));
    const columnHeaderLabels = (columnHeaders || []).map((header) => header.nativeElement.innerText);

    expect(columnHeaderLabels).toContain('Actions');
  });

  it('should display corresponding values for columns', () => {
    component.columns = mockColumns;
    component.rows = mockRows;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    const firstRowValues = rows[0].queryAll(By.css('td'))
      .map((column) => column.nativeElement.innerText)
      .slice(0, mockColumns.length);
    const suppliedValuesDisplayedForFirstRow = firstRowValues.toString() === Object.values(firstRowValues).toString();

    expect(suppliedValuesDisplayedForFirstRow).toBeTruthy();
  });

  it('should call sort method when clicking on column header', () => {
    spyOn(component.sort, 'emit');
    component.columns = mockColumns;
    component.rows = mockRows;
    fixture.detectChanges();

    const columnHeaders = fixture.debugElement.queryAll(By.css('thead tr th'));
    columnHeaders[0].nativeElement.dispatchEvent(new Event('click'));

    expect(component.sort.emit).toHaveBeenCalled();
  });

  it('should emit events on action buttons click', () => {
    spyOn(component.editElement, 'emit');
    spyOn(component.removeElement, 'emit');
    component.columns = mockColumns;
    component.rows = mockRows;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    const firstRowValues = rows[0].queryAll(By.css('td'));
    const [editButton, removeButton] = firstRowValues[firstRowValues.length - 1].queryAll(By.css('button'));

    editButton.nativeElement.dispatchEvent(new Event('click'));
    removeButton.nativeElement.dispatchEvent(new Event('click'));

    expect(component.editElement.emit).toHaveBeenCalled();
    expect(component.removeElement.emit).toHaveBeenCalled();
  });


});
