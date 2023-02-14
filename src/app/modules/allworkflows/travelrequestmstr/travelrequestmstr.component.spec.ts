import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TravelrequestmstrComponent } from './travelrequestmstr.component';

describe('TravelrequestmstrComponent', () => {
  let component: TravelrequestmstrComponent;
  let fixture: ComponentFixture<TravelrequestmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelrequestmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelrequestmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
