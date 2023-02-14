import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FxdassetvwbtncstmComponent } from './fxdassetvwbtncstm.component';

describe('FxdassetvwbtncstmComponent', () => {
  let component: FxdassetvwbtncstmComponent;
  let fixture: ComponentFixture<FxdassetvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FxdassetvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxdassetvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
