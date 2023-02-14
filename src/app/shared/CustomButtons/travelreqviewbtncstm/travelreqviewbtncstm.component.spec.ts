import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TravelreqviewbtncstmComponent } from './travelreqviewbtncstm.component';

describe('TravelreqviewbtncstmComponent', () => {
  let component: TravelreqviewbtncstmComponent;
  let fixture: ComponentFixture<TravelreqviewbtncstmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelreqviewbtncstmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelreqviewbtncstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
