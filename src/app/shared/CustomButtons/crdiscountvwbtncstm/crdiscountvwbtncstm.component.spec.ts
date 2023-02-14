import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrdiscountvwbtncstmComponent } from './crdiscountvwbtncstm.component';

describe('CrdiscountvwbtncstmComponent', () => {
  let component: CrdiscountvwbtncstmComponent;
  let fixture: ComponentFixture<CrdiscountvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrdiscountvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrdiscountvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
