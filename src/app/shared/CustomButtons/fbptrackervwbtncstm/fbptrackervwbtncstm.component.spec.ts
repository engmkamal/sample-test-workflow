import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FbptrackervwbtncstmComponent } from './fbptrackervwbtncstm.component';

describe('FbptrackervwbtncstmComponent', () => {
  let component: FbptrackervwbtncstmComponent;
  let fixture: ComponentFixture<FbptrackervwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FbptrackervwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbptrackervwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
