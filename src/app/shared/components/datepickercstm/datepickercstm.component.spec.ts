import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatepickercstmComponent } from './datepickercstm.component';

describe('DatepickercstmComponent', () => {
  let component: DatepickercstmComponent;
  let fixture: ComponentFixture<DatepickercstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickercstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickercstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
