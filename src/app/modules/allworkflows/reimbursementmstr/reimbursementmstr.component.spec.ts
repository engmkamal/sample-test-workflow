import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReimbursementmstrComponent } from './reimbursementmstr.component';

describe('ReimbursementmstrComponent', () => {
  let component: ReimbursementmstrComponent;
  let fixture: ComponentFixture<ReimbursementmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
