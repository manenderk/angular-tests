import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTable2Component } from './editable-table2.component';

describe('EditableTable2Component', () => {
  let component: EditableTable2Component;
  let fixture: ComponentFixture<EditableTable2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableTable2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
