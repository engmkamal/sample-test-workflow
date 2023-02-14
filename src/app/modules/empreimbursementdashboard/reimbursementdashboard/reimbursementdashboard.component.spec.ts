import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementdashboardComponent } from './reimbursementdashboard.component';

describe('ReimbursementdashboardComponent', () => {
  let component: ReimbursementdashboardComponent;
  let fixture: ComponentFixture<ReimbursementdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimbursementdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
