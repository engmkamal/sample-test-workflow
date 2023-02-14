import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpreimbursementdetailrenderedComponent } from './empreimbursementdetailrendered.component';

describe('EmpreimbursementdetailrenderedComponent', () => {
  let component: EmpreimbursementdetailrenderedComponent;
  let fixture: ComponentFixture<EmpreimbursementdetailrenderedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpreimbursementdetailrenderedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpreimbursementdetailrenderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
