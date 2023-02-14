import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FundrequestmstrComponent } from './fundrequestmstr.component';

describe('FundrequestmstrComponent', () => {
  let component: FundrequestmstrComponent;
  let fixture: ComponentFixture<FundrequestmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FundrequestmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundrequestmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
