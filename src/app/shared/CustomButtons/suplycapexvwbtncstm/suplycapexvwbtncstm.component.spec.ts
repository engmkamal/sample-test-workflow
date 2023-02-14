import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuplycapexvwbtncstmComponent } from './suplycapexvwbtncstm.component';

describe('SuplycapexvwbtncstmComponent', () => {
  let component: SuplycapexvwbtncstmComponent;
  let fixture: ComponentFixture<SuplycapexvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuplycapexvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplycapexvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
