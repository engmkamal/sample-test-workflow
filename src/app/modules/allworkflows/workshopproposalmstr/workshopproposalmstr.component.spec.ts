import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkshopproposalmstrComponent } from './workshopproposalmstr.component';

describe('WorkshopproposalmstrComponent', () => {
  let component: WorkshopproposalmstrComponent;
  let fixture: ComponentFixture<WorkshopproposalmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopproposalmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopproposalmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
