import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeeadvancemstrComponent } from './employeeadvancemstr.component';

describe('EmployeeadvancemstrComponent', () => {
  let component: EmployeeadvancemstrComponent;
  let fixture: ComponentFixture<EmployeeadvancemstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeadvancemstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeadvancemstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
