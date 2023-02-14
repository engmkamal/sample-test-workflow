import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LiactionbtncstmComponent } from './liactionbtncstm.component';

describe('LiactionbtncstmComponent', () => {
  let component: LiactionbtncstmComponent;
  let fixture: ComponentFixture<LiactionbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LiactionbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiactionbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
