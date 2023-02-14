import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampletestdashboardComponent } from './sampletestdashboard.component';

describe('SampletestdashboardComponent', () => {
  let component: SampletestdashboardComponent;
  let fixture: ComponentFixture<SampletestdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampletestdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampletestdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
