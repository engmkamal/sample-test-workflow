import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FundrequestvwbtncstmComponent } from './fundrequestvwbtncstm.component';

describe('FundrequestvwbtncstmComponent', () => {
  let component: FundrequestvwbtncstmComponent;
  let fixture: ComponentFixture<FundrequestvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FundrequestvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundrequestvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
