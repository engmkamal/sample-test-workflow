import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecurityincidencemstrComponent } from './securityincidencemstr.component';

describe('SecurityincidencemstrComponent', () => {
  let component: SecurityincidencemstrComponent;
  let fixture: ComponentFixture<SecurityincidencemstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityincidencemstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityincidencemstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
