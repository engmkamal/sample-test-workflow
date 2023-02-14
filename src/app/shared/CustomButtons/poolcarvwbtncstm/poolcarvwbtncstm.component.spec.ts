import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PoolcarvwbtncstmComponent } from './poolcarvwbtncstm.component';

describe('PoolcarvwbtncstmComponent', () => {
  let component: PoolcarvwbtncstmComponent;
  let fixture: ComponentFixture<PoolcarvwbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolcarvwbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolcarvwbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
