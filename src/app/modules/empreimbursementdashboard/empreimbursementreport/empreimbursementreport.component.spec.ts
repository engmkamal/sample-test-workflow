import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpreimbursementreportComponent } from './empreimbursementreport.component';

describe('EmpreimbursementreportComponent', () => {
  let component: EmpreimbursementreportComponent;
  let fixture: ComponentFixture<EmpreimbursementreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpreimbursementreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpreimbursementreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
