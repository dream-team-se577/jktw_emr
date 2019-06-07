import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSearchComponent } from './lab-search.component';

describe('LabSearchComponent', () => {
  let component: LabSearchComponent;
  let fixture: ComponentFixture<LabSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
