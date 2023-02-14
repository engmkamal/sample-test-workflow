import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FreefgmstrComponent } from './freefgmstr.component';

describe('FreefgmstrComponent', () => {
  let component: FreefgmstrComponent;
  let fixture: ComponentFixture<FreefgmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FreefgmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreefgmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
