import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HrservicevwbtncstmComponent } from './hrservicevwbtncstm.component';

describe('HrservicevwbtncstmComponent', () => {
  let component: HrservicevwbtncstmComponent;
  let fixture: ComponentFixture<HrservicevwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HrservicevwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrservicevwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
