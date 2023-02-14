import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItassetmanagementmstrComponent } from './itassetmanagementmstr.component';

describe('ItassetmanagementmstrComponent', () => {
  let component: ItassetmanagementmstrComponent;
  let fixture: ComponentFixture<ItassetmanagementmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItassetmanagementmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItassetmanagementmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
