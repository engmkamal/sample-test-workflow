import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrademerchandisingmstrComponent } from './trademerchandisingmstr.component';

describe('TrademerchandisingmstrComponent', () => {
  let component: TrademerchandisingmstrComponent;
  let fixture: ComponentFixture<TrademerchandisingmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademerchandisingmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademerchandisingmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
