import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrademerchandisingComponent } from './trademerchandising.component';

describe('TrademerchandisingComponent', () => {
  let component: TrademerchandisingComponent;
  let fixture: ComponentFixture<TrademerchandisingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademerchandisingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademerchandisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
