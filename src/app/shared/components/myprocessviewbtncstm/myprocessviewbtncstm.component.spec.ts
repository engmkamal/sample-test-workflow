import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyprocessviewbtncstmComponent } from './myprocessviewbtncstm.component';

describe('MyprocessviewbtncstmComponent', () => {
  let component: MyprocessviewbtncstmComponent;
  let fixture: ComponentFixture<MyprocessviewbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprocessviewbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprocessviewbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
