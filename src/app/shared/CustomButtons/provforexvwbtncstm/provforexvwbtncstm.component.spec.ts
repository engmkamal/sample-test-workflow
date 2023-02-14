import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvforexvwbtncstmComponent } from './provforexvwbtncstm.component';

describe('ProvforexvwbtncstmComponent', () => {
  let component: ProvforexvwbtncstmComponent;
  let fixture: ComponentFixture<ProvforexvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvforexvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvforexvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
