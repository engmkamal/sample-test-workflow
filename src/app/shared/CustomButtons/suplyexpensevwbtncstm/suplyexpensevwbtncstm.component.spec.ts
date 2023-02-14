import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuplyexpensevwbtncstmComponent } from './suplyexpensevwbtncstm.component';

describe('SuplyexpensevwbtncstmComponent', () => {
  let component: SuplyexpensevwbtncstmComponent;
  let fixture: ComponentFixture<SuplyexpensevwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuplyexpensevwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplyexpensevwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
