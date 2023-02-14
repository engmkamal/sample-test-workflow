import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoecheckpaymentmstrComponent } from './boecheckpaymentmstr.component';

describe('BoecheckpaymentmstrComponent', () => {
  let component: BoecheckpaymentmstrComponent;
  let fixture: ComponentFixture<BoecheckpaymentmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoecheckpaymentmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoecheckpaymentmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
