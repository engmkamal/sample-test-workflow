import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManpowerreqvwbtncstmComponent } from './manpowerreqvwbtncstm.component';

describe('ManpowerreqvwbtncstmComponent', () => {
  let component: ManpowerreqvwbtncstmComponent;
  let fixture: ComponentFixture<ManpowerreqvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManpowerreqvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerreqvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
