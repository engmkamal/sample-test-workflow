import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopproposalreportComponent } from './workshopproposalreport.component';

describe('WorkshopproposalreportComponent', () => {
  let component: WorkshopproposalreportComponent;
  let fixture: ComponentFixture<WorkshopproposalreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopproposalreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopproposalreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
