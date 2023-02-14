import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LiActionBtnCstmComponent } from './li-action-btn-cstm.component';

describe('LiActionBtnCstmComponent', () => {
  let component: LiActionBtnCstmComponent;
  let fixture: ComponentFixture<LiActionBtnCstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LiActionBtnCstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiActionBtnCstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
