import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItservicerequestdashboardComponent } from './itservicerequestdashboard.component';

describe('ItservicerequestdashboardComponent', () => {
  let component: ItservicerequestdashboardComponent;
  let fixture: ComponentFixture<ItservicerequestdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItservicerequestdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItservicerequestdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
