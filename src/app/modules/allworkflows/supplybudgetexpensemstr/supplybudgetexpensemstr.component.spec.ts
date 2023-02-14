import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplybudgetexpensemstrComponent } from './supplybudgetexpensemstr.component';

describe('SupplybudgetexpensemstrComponent', () => {
  let component: SupplybudgetexpensemstrComponent;
  let fixture: ComponentFixture<SupplybudgetexpensemstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplybudgetexpensemstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplybudgetexpensemstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
