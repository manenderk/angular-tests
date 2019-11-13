import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleModulesContainerComponent } from './sample-modules-container.component';

describe('SampleModulesContainerComponent', () => {
  let component: SampleModulesContainerComponent;
  let fixture: ComponentFixture<SampleModulesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleModulesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleModulesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
