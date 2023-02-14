import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmppaintdisviewbtncstmComponent } from './emppaintdisviewbtncstm.component';

describe('EmppaintdisviewbtncstmComponent', () => {
  let component: EmppaintdisviewbtncstmComponent;
  let fixture: ComponentFixture<EmppaintdisviewbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmppaintdisviewbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmppaintdisviewbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
