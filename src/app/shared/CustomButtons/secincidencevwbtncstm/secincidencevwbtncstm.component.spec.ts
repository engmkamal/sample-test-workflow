import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecincidencevwbtncstmComponent } from './secincidencevwbtncstm.component';

describe('SecincidencevwbtncstmComponent', () => {
  let component: SecincidencevwbtncstmComponent;
  let fixture: ComponentFixture<SecincidencevwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SecincidencevwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecincidencevwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
