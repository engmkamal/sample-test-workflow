import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplybudgetcapexmstrComponent } from './supplybudgetcapexmstr.component';

describe('SupplybudgetcapexmstrComponent', () => {
  let component: SupplybudgetcapexmstrComponent;
  let fixture: ComponentFixture<SupplybudgetcapexmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplybudgetcapexmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplybudgetcapexmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
