import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorcomplaintmstrComponent } from './vendorcomplaintmstr.component';

describe('VendorcomplaintmstrComponent', () => {
  let component: VendorcomplaintmstrComponent;
  let fixture: ComponentFixture<VendorcomplaintmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorcomplaintmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorcomplaintmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
