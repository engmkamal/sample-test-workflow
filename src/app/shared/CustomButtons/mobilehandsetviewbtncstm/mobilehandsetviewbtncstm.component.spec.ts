import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobilehandsetviewbtncstmComponent } from './mobilehandsetviewbtncstm.component';

describe('MobilehandsetviewbtncstmComponent', () => {
  let component: MobilehandsetviewbtncstmComponent;
  let fixture: ComponentFixture<MobilehandsetviewbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilehandsetviewbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilehandsetviewbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
