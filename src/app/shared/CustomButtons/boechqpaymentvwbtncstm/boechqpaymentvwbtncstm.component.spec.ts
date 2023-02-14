import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoechqpaymentvwbtncstmComponent } from './boechqpaymentvwbtncstm.component';

describe('BoechqpaymentvwbtncstmComponent', () => {
  let component: BoechqpaymentvwbtncstmComponent;
  let fixture: ComponentFixture<BoechqpaymentvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoechqpaymentvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoechqpaymentvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
