import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItservicevwbtncstmComponent } from './itservicevwbtncstm.component';

describe('ItservicevwbtncstmComponent', () => {
  let component: ItservicevwbtncstmComponent;
  let fixture: ComponentFixture<ItservicevwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItservicevwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItservicevwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
