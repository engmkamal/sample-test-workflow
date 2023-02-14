import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerfeedbackstComponent } from './customerfeedbackst.component';

describe('CustomerfeedbackstComponent', () => {
  let component: CustomerfeedbackstComponent;
  let fixture: ComponentFixture<CustomerfeedbackstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerfeedbackstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerfeedbackstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
