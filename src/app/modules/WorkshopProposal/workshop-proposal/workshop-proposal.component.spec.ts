import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkshopProposalComponent } from './workshop-proposal.component';

describe('WorkshopProposalComponent', () => {
  let component: WorkshopProposalComponent;
  let fixture: ComponentFixture<WorkshopProposalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
