import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentByIdComponent } from './appointment-by-id.component';

describe('AppointmentByIdComponent', () => {
  let component: AppointmentByIdComponent;
  let fixture: ComponentFixture<AppointmentByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
