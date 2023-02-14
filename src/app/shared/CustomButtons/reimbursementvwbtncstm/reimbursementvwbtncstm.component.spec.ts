import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReimbursementvwbtncstmComponent } from './reimbursementvwbtncstm.component';

describe('ReimbursementvwbtncstmComponent', () => {
  let component: ReimbursementvwbtncstmComponent;
  let fixture: ComponentFixture<ReimbursementvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
