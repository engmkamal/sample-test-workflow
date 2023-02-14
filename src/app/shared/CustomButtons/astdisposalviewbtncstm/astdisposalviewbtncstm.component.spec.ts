import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AstdisposalviewbtncstmComponent } from './astdisposalviewbtncstm.component';

describe('AstdisposalviewbtncstmComponent', () => {
  let component: AstdisposalviewbtncstmComponent;
  let fixture: ComponentFixture<AstdisposalviewbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AstdisposalviewbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstdisposalviewbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
