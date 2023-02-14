import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TravelreqadjustmentbtncstmComponent } from './travelreqadjustmentbtncstm.component';

describe('TravelreqadjustmentbtncstmComponent', () => {
  let component: TravelreqadjustmentbtncstmComponent;
  let fixture: ComponentFixture<TravelreqadjustmentbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelreqadjustmentbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelreqadjustmentbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
