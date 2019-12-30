import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleViewerComponent } from './google-viewer.component';

describe('GoogleViewerComponent', () => {
  let component: GoogleViewerComponent;
  let fixture: ComponentFixture<GoogleViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
