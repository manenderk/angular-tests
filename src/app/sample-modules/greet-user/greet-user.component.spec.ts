import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetUserComponent } from './greet-user.component';

describe('GreetUserComponent', () => {
  let component: GreetUserComponent;
  let fixture: ComponentFixture<GreetUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
