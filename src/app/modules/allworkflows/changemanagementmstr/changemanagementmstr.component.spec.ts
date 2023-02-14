import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangemanagementmstrComponent } from './changemanagementmstr.component';

describe('ChangemanagementmstrComponent', () => {
  let component: ChangemanagementmstrComponent;
  let fixture: ComponentFixture<ChangemanagementmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangemanagementmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangemanagementmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
