import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HrservicemstrComponent } from './hrservicemstr.component';

describe('HrservicemstrComponent', () => {
  let component: HrservicemstrComponent;
  let fixture: ComponentFixture<HrservicemstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HrservicemstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrservicemstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
