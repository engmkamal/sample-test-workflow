import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreditdiscountmstrComponent } from './creditdiscountmstr.component';

describe('CreditdiscountmstrComponent', () => {
  let component: CreditdiscountmstrComponent;
  let fixture: ComponentFixture<CreditdiscountmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditdiscountmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditdiscountmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
