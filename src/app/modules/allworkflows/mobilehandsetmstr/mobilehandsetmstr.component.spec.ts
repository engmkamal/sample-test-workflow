import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobilehandsetmstrComponent } from './mobilehandsetmstr.component';

describe('MobilehandsetmstrComponent', () => {
  let component: MobilehandsetmstrComponent;
  let fixture: ComponentFixture<MobilehandsetmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilehandsetmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilehandsetmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
