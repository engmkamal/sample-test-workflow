import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManpowerrequisitionmstrComponent } from './manpowerrequisitionmstr.component';

describe('ManpowerrequisitionmstrComponent', () => {
  let component: ManpowerrequisitionmstrComponent;
  let fixture: ComponentFixture<ManpowerrequisitionmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManpowerrequisitionmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerrequisitionmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
