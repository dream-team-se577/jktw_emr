import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabByIdComponent } from './lab-by-id.component';

describe('LabByIdComponent', () => {
  let component: LabByIdComponent;
  let fixture: ComponentFixture<LabByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
