import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrefgvwbtncstmComponent } from './frefgvwbtncstm.component';

describe('FrefgvwbtncstmComponent', () => {
  let component: FrefgvwbtncstmComponent;
  let fixture: ComponentFixture<FrefgvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrefgvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrefgvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
