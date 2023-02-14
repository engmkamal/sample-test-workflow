import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorcomplainvwbtncstmComponent } from './vendorcomplainvwbtncstm.component';

describe('VendorcomplainvwbtncstmComponent', () => {
  let component: VendorcomplainvwbtncstmComponent;
  let fixture: ComponentFixture<VendorcomplainvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorcomplainvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorcomplainvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
