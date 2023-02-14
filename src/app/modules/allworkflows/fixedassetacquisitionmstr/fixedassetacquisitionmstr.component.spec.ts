import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixedassetacquisitionmstrComponent } from './fixedassetacquisitionmstr.component';

describe('FixedassetacquisitionmstrComponent', () => {
  let component: FixedassetacquisitionmstrComponent;
  let fixture: ComponentFixture<FixedassetacquisitionmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedassetacquisitionmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedassetacquisitionmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
