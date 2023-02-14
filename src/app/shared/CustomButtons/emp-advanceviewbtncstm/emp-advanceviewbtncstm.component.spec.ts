import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpAdvanceviewbtncstmComponent } from './emp-advanceviewbtncstm.component';

describe('EmpAdvanceviewbtncstmComponent', () => {
  let component: EmpAdvanceviewbtncstmComponent;
  let fixture: ComponentFixture<EmpAdvanceviewbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpAdvanceviewbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAdvanceviewbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
