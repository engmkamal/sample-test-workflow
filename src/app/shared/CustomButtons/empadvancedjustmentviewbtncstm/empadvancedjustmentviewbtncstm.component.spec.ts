import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpadvancedjustmentviewbtncstmComponent } from './empadvancedjustmentviewbtncstm.component';

describe('EmpadvancedjustmentviewbtncstmComponent', () => {
  let component: EmpadvancedjustmentviewbtncstmComponent;
  let fixture: ComponentFixture<EmpadvancedjustmentviewbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpadvancedjustmentviewbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpadvancedjustmentviewbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
