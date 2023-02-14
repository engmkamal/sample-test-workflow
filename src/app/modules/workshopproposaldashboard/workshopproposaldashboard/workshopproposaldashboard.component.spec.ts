import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopproposaldashboardComponent } from './workshopproposaldashboard.component';

describe('WorkshopproposaldashboardComponent', () => {
  let component: WorkshopproposaldashboardComponent;
  let fixture: ComponentFixture<WorkshopproposaldashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopproposaldashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopproposaldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
