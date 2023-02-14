import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TmliviewbtncstmComponent } from './tmliviewbtncstm.component';

describe('TmliviewbtncstmComponent', () => {
  let component: TmliviewbtncstmComponent;
  let fixture: ComponentFixture<TmliviewbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TmliviewbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmliviewbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
